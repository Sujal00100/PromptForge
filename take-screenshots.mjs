import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";
const SCREENSHOTS_DIR = path.resolve("screenshots");
const OUTPUT_PDF = path.resolve("Project_Screenshots.pdf");
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("🚀 Starting screenshot capture (retry for results)...\n");

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    defaultViewport: { width: 1440, height: 900 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // Keep existing landing/input screenshots, just redo the critical ones
  const allScreenshots = [
    path.join(SCREENSHOTS_DIR, "01_landing_page.png"),
    path.join(SCREENSHOTS_DIR, "02_optimize_input.png"),
  ];

  try {
    // ── Go to optimize page and submit ──
    console.log("📸 Navigating to optimize page...");
    await page.goto(`${BASE_URL}/optimize`, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(2000);

    // Fill inputs
    const allInputs = await page.$$("input, textarea");
    console.log(`   Found ${allInputs.length} input(s)`);

    if (allInputs.length >= 2) {
      await allInputs[0].click({ clickCount: 3 });
      await allInputs[0].type("Write a product description for a SaaS tool", { delay: 15 });
      await allInputs[allInputs.length - 1].click({ clickCount: 3 });
      await allInputs[allInputs.length - 1].type(
        "Write me a product description for my app. It helps people be more productive. Make it sound good and professional.",
        { delay: 8 }
      );
    }

    // Screenshot filled form
    const filledPath = path.join(SCREENSHOTS_DIR, "03_optimize_filled.png");
    await page.screenshot({ path: filledPath, fullPage: true });
    allScreenshots.push(filledPath);
    console.log(`   ✅ Saved filled form`);

    // Click submit
    let clicked = false;
    const allButtons = await page.$$("button");
    for (const btn of allButtons) {
      const text = await page.evaluate((el) => el.textContent || "", btn);
      const disabled = await page.evaluate((el) => el.disabled, btn);
      if (!disabled && (text.includes("Optimi") || text.includes("Analyz") || text.includes("Submit"))) {
        await btn.click();
        clicked = true;
        console.log(`   🖱️ Clicked: "${text.trim()}"`);
        break;
      }
    }

    if (clicked) {
      // Wait much longer - up to 2 minutes
      console.log("   ⏳ Waiting for AI results (up to 2 minutes)...");
      let resultsAppeared = false;
      
      for (let i = 0; i < 60; i++) {
        await delay(2000);
        const status = await page.evaluate(() => {
          const body = document.body.innerText;
          const hasSpinner = document.querySelector('[class*="animate-spin"]') !== null;
          const hasScore = body.includes("overall") || body.includes("Score") || body.includes("/100");
          const hasRewrite = body.includes("Rewrite") || body.includes("rewritten") || body.includes("Improvements");
          const hasSkeleton = document.querySelectorAll('[class*="skeleton"], [class*="Skeleton"]').length > 0;
          return { hasSpinner, hasScore, hasRewrite, hasSkeleton };
        });

        if ((status.hasScore || status.hasRewrite) && !status.hasSpinner && !status.hasSkeleton) {
          resultsAppeared = true;
          console.log("   ✅ Results loaded!");
          await delay(3000);
          break;
        }
        
        if (i % 10 === 0 && i > 0) {
          console.log(`   ... still waiting (${i * 2}s elapsed)`);
        }
      }

      if (!resultsAppeared) {
        console.log("   ⚠️ Timed out waiting for results");
        // Check if there was an error
        const errorCheck = await page.evaluate(() => {
          const toasts = document.querySelectorAll('[class*="toast"], [role="alert"]');
          let errorText = "";
          toasts.forEach(t => errorText += t.textContent + " ");
          return errorText;
        });
        if (errorCheck.trim()) {
          console.log(`   ⚠️ Error: ${errorCheck.trim()}`);
        }
      }

      // Screenshot results page (whatever state it's in)
      const resultsPath = path.join(SCREENSHOTS_DIR, "04_optimize_results.png");
      await page.screenshot({ path: resultsPath, fullPage: true });
      allScreenshots.push(resultsPath);
      console.log(`   ✅ Saved results`);

      if (resultsAppeared) {
        // ── Generate Versions ──
        console.log("📸 Generating Versions...");
        const versionClicked = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const btn = buttons.find((b) => b.textContent?.includes("Version") && !b.disabled);
          if (btn) { btn.click(); return true; }
          return false;
        });

        if (versionClicked) {
          console.log("   ⏳ Waiting for versions (up to 2 minutes)...");
          for (let i = 0; i < 60; i++) {
            await delay(2000);
            const done = await page.evaluate(() => {
              const body = document.body.innerText.toLowerCase();
              const hasVersions = body.includes("creative") || body.includes("concise") || body.includes("technical");
              const hasSpinner = document.querySelector('[class*="animate-spin"]') !== null;
              return hasVersions && !hasSpinner;
            });
            if (done) { await delay(2000); break; }
            if (i % 10 === 0 && i > 0) console.log(`   ... still waiting (${i * 2}s)`);
          }

          const versionsPath = path.join(SCREENSHOTS_DIR, "05_versions_panel.png");
          await page.screenshot({ path: versionsPath, fullPage: true });
          allScreenshots.push(versionsPath);
          console.log(`   ✅ Saved versions`);

          // ── Compare ──
          console.log("📸 Running Compare...");
          const compareClicked = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll("button"));
            const btn = buttons.find((b) => b.textContent?.includes("Compare") && !b.disabled);
            if (btn) { btn.click(); return true; }
            return false;
          });

          if (compareClicked) {
            console.log("   ⏳ Waiting for comparison (up to 2 minutes)...");
            for (let i = 0; i < 60; i++) {
              await delay(2000);
              const done = await page.evaluate(() => {
                const body = document.body.innerText.toLowerCase();
                const hasCmp = body.includes("winner") || body.includes("judge") || body.includes("verdict") || body.includes("ranking");
                const hasSpinner = document.querySelector('[class*="animate-spin"]') !== null;
                return hasCmp && !hasSpinner;
              });
              if (done) { await delay(2000); break; }
              if (i % 10 === 0 && i > 0) console.log(`   ... still waiting (${i * 2}s)`);
            }

            const comparePath = path.join(SCREENSHOTS_DIR, "06_compare_view.png");
            await page.screenshot({ path: comparePath, fullPage: true });
            allScreenshots.push(comparePath);
            console.log(`   ✅ Saved compare`);
          }
        }

        // Save to history
        console.log("   💾 Saving to history...");
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const btn = buttons.find((b) => b.textContent?.includes("Save") && !b.disabled);
          if (btn) btn.click();
        });
        await delay(2000);
      }
    }

    // ── Dashboard ──
    console.log("📸 Capturing Dashboard...");
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(3000);
    const dashPath = path.join(SCREENSHOTS_DIR, "07_dashboard.png");
    await page.screenshot({ path: dashPath, fullPage: true });
    allScreenshots.push(dashPath);
    console.log(`   ✅ Saved dashboard`);

    // ── History ──
    console.log("📸 Capturing History...");
    await page.goto(`${BASE_URL}/history`, { waitUntil: "networkidle0", timeout: 30000 });
    await delay(2000);
    const histPath = path.join(SCREENSHOTS_DIR, "08_history_list.png");
    await page.screenshot({ path: histPath, fullPage: true });
    allScreenshots.push(histPath);
    console.log(`   ✅ Saved history`);

    // History detail
    const entryClicked = await page.evaluate(() => {
      const clickables = document.querySelectorAll("div[class*='cursor-pointer'], div[role='button']");
      for (const el of clickables) {
        if (el.textContent && el.textContent.length > 10) {
          el.click();
          return true;
        }
      }
      return false;
    });
    if (entryClicked) {
      await delay(2000);
      const detailPath = path.join(SCREENSHOTS_DIR, "09_history_detail.png");
      await page.screenshot({ path: detailPath, fullPage: true });
      allScreenshots.push(detailPath);
      console.log(`   ✅ Saved history detail`);
    }

    // ── Generate PDF ──
    // Filter to only existing files
    const validScreenshots = allScreenshots.filter(f => fs.existsSync(f));
    console.log(`\n📄 Generating PDF from ${validScreenshots.length} screenshots...`);
    await generatePDF(validScreenshots, browser);
    console.log(`\n✅ PDF saved to: ${OUTPUT_PDF}`);

  } catch (error) {
    console.error("❌ Error:", error.message);
    const validScreenshots = allScreenshots.filter(f => fs.existsSync(f));
    if (validScreenshots.length > 0) {
      console.log(`\n📄 Generating PDF from ${validScreenshots.length} screenshots...`);
      await generatePDF(validScreenshots, browser);
      console.log(`\n✅ Partial PDF saved to: ${OUTPUT_PDF}`);
    }
  } finally {
    await browser.close();
    console.log("\n🏁 Done!");
  }
}

async function generatePDF(imagePaths, browser) {
  const imagesHtml = imagePaths
    .map((imgPath, index) => {
      const name = path
        .basename(imgPath, ".png")
        .replace(/^\d+_/, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const base64 = fs.readFileSync(imgPath).toString("base64");
      const pageBreak = index < imagePaths.length - 1 ? "page-break-after: always;" : "";

      return `
        <div style="text-align: center; padding: 15px 30px; ${pageBreak}">
          <h2 style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; margin-bottom: 12px; font-size: 20px; border-bottom: 2px solid #7c3aed; padding-bottom: 8px; display: inline-block;">
            ${index + 1}. ${name}
          </h2>
          <div style="margin-top: 8px;">
            <img src="data:image/png;base64,${base64}" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
          </div>
        </div>
      `;
    })
    .join("\n");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="margin: 0; padding: 0; background: white;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: white; page-break-after: always;">
        <div style="display: inline-block; margin-bottom: 30px; padding: 8px 24px; background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); border-radius: 999px; color: #c4b5fd; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px;">
          ✨ Powered by Groq AI
        </div>
        <h1 style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 44px; font-weight: 800; background: linear-gradient(135deg, #a78bfa, #22d3ee, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 16px 0;">
          PromptForge - AI Prompt Optimizer
        </h1>
        <p style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px; color: #a0a0b0; margin: 0 0 8px 0;">
          Analyze, Score, Rewrite & Optimize Your AI Prompts
        </p>
        <p style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #666; margin-top: 30px;">
          Project Screenshots — ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
      ${imagesHtml}
    </body>
    </html>
  `;

  const pdfPage = await browser.newPage();
  await pdfPage.setContent(htmlContent, { waitUntil: "networkidle0" });
  await pdfPage.pdf({
    path: OUTPUT_PDF,
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
  });
  await pdfPage.close();
}

main();
