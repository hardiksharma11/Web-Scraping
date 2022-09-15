const axios = require("axios");
const cheerio = require("cheerio");

const getProductUrl=(product)=>`https://www.amazon.in/s?k=${product}`;
const fetchitems = async (product) => {
    try {
        const url = getProductUrl(product);
        const response = await axios.get(url,
            {
                headers: {
                    Accept:
                      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    Host: "www.amazon.in",
              
                    "user-agent":
                      ",Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
              
                    Pragma: "no-cache",
                    TE: "Trailers",
                    "upgrade-insecure-requests": 1,
                  },
            }
        );

        const html = response.data;
        const $ = cheerio.load(html);

        const items = [];
        // console.log("gud");
        $(".sg-col-0-of-12 ").each((_idx, el) => {
            // console.log("inside");
            const itemList = $(el);
            let element = {
                Name: "",
                Price: "",
            };
            element.Name = itemList.find("a .a-size-medium").text();
            element.Price = itemList.find(".a-price-whole").text();
            //   console.log(title);

            items.push(element);
        });

        return items;
    } catch (error) {
        throw error;
    }
};

// any electrical item (phones, laptop, pendrives, etc.)
fetchitems('earphones').then((items) => console.log(items));
