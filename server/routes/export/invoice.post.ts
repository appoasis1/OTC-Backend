
import puppeteer from "puppeteer";
import { HOST } from "~/services/global.variables";

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);

    // Destruct body
    const { id } = body;


    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: [
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            '--autoplay-policy=user-gesture-required',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disabled-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-domain-reliability',
            '--disable-extensions',
            '--disable-features=AudioServiceOutOfProcess',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-popup-blocking',
            '--disable-print-preview',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-speech-api',
            '--disable-sync',
            '--hide-scrollbars',
            '--ignore-gpu-blacklist',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-zygote',
            '--no-sandbox',
            '--password-store=basic',
            '--use-gl=swiftshader',
            '--use-mock-keychain'
        ] 
    });
    
    const page = await browser.newPage();

    // Create PDF from URL'
    console.log("hosssssssssssst",HOST)
    await page.goto(`${HOST}sales_invoice/invoiceExport-${id}`, { waitUntil: 'networkidle0' });

    const stream = await page.pdf({ format: 'a4'});

    await browser.close();

    // Return PDF Stream
    return stream;
});