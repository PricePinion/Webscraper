import { expect } from "chai";
import { describe, it } from "mocha";
import { WholeFoodsScraper } from "@store-scrapers/WholeFoodsScraper";
import * as dotenv from "dotenv";

dotenv.config();
describe("Test Wholefoods scraper", async () => {
    it("scrapes all urls for Wholefoods, returns an object with scraped products, all object values are strings", async () => {
        const wfScraperObj = new WholeFoodsScraper();
        // Runs the Wholefoods Scraper and stores the scraped products
        const scrapeResults = await wfScraperObj.wholeFoodsScraper();
        expect(scrapeResults).to.be.instanceOf(Object);
        // Expect the scrape results to contain entries for the departments
        expect(Object.keys(scrapeResults)).to.not.be.empty;

        // Iterate through each entry in the object
        for (const department of Object.keys(scrapeResults)) {
            // Expect each department to contain data
            expect(scrapeResults[department]).to.not.be.empty;

            // Ensure that each object in the array has a type string,
            // If the scraper failed each entry would be null.
            for (const product of scrapeResults[department]) {
                expect(product.name).to.be.string;
                expect(product.price).to.be.string;
                expect(product.url).to.be.string;
                expect(product.image).to.be.string;
            }
        }
    });
});
