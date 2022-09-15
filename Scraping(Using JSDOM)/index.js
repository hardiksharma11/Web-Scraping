
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const getProductUrl = (product_id) =>
  `https://www.amazon.in/gp/product/ajax/?asin=${product_id}&m=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=1-3&pc=dp&experienceId=aodAjaxMain`;

async function getPrice(product_id) {
  const productUrl = getProductUrl(product_id);
  const { data: html } = await axios.get(productUrl, {
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
  });

  const dom = new JSDOM(html);
  const $ = (selector) => dom.window.document.querySelector(selector);
  //   console.log(dom.window.document.querySelector('.a-price .a-offscreen').textContent);
  const pinnedElement = $("#pinned-de-id");
  const pinnedBy=$("#aod-offer-soldBy");
  const pinnedSeller=pinnedBy.querySelector("a").textContent;
  const title = $("#aod-asin-title-text").textContent;
  const pinnedPrice = pinnedElement.querySelector(".a-price .a-offscreen").textContent;
//   const pinnedOfferId=pinnedElement.querySelector('input[name="items[0.base][offerListingId]"]').getAttribute("value");

const offerListElement=$("#aod-offer-list");
const offerElement=offerListElement.querySelectorAll('.aod-information-block');
const offers=[];
offerElement.forEach((offerElement) => {
    const price = offerElement.querySelector('.a-price .a-offscreen').textContent;
    offers.push({
        price,
    });
});

  const pinned = {
    price: pinnedPrice,
    // Offer_ID: pinnedOfferId,
    seller: pinnedSeller,
  };

  const result = {
    title,
    pinned,
    offers,
  };
  
  console.log(result);
}


getPrice(`B08PV548K9`);

