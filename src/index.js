// @flow
let PDFJS = require('pdfjs-dist');
let beginIndex: number = 2;

PDFJS.getDocument('assets/document.pdf')
  .then((doc) => {
    let numPages = doc.numPages;
    let loadPage = (pageNum: number) => {
      return doc.getPage(pageNum).then((page) => {
        return page.getTextContent().then((content) => {
          let rawContent: string[] = content.items.map((item) => {
            return item.str;
          });

          let textContent: string = rawContent.join('');

          if (!textContent.includes('....')) {
            console.log(`~~~Text Content of page : ${pageNum}`);
            console.log(textContent);
          } else {
            console.log('----------------------------------');
            console.log(`Page ${pageNum} will be skipped`);
            console.log('----------------------------------');
          }

        });
      })
    };

    let lastPromise = loadPage(beginIndex++);

    for (var i = beginIndex; i <= numPages; i++) {
      lastPromise = lastPromise.then(loadPage.bind(this, i));
    }

  })
  .catch(function (err) {
    console.error(`Error : ${err}`);
  });