var ReportPage = function(browser, webdriver) {


    //
    // Get detail results for rule
    //
    this.getDetailsResultsForRule = function(ruleIndex, callback) {

        browser.findElement(webdriver.By.xpath('.//div[contains(@class,"rightBlock")]/child::div[' + ruleIndex + ']')).then(function(elem) {

            callback(elem);

        });
    };

    //
    // Get the DetailsRow by index for the elem argument
    //
    this.getDetailsRowByIndex = function(rowIndex, elem, callback) {

        elem.findElements(webdriver.By.xpath('.//descendant::div[contains(@class, "detailsRow")]/*[contains(@class, "rightColumn")]')).then(function(elem) {

            elem[rowIndex].getText().then(function(txt) {

                callback(txt);

            });

        });

    };

    //
    // Get the DetailsRow by index for the elem argument
    //
    this.getRegressionRowByIndex = function(rowIndex, elem, callback) {

        elem.findElements(webdriver.By.xpath('.//descendant::div[contains(@class, "rowWithStatusAndDrillDown")]/*[contains(@class, "title")]')).then(function(elem) {

            elem[rowIndex].getText().then(function(txt) {
                log(txt);
                callback(txt);

            });

        });

    };

    //
    // Get the coverageRow text by index for the elem argument
    //
    this.getCoverageRowTextByIndex = function(rowIndex, elem, callback) {

        elem.findElements(webdriver.By.xpath('.//descendant::div[contains(@class, "rowWithCoverageGraphs")]/div')).then(function(elem) {

            elem[rowIndex].getText().then(function(txt) {

                callback(txt);

            });

        });

    };

    //
    // Get the coverageRow html by index for the elem argument
    //
    this.getCoverageRowHTMLByIndex = function(rowIndex, elem, callback) {

        elem.findElements(webdriver.By.xpath('.//descendant::div[contains(@class, "rowWithCoverageGraphs")]/div')).then(function(elem) {

            elem[rowIndex].getInnerHtml().then(function(html) {

                callback(html);

            });

        });

    };

    //
    // Click rule on the left navigation bar
    //  index = number in the list of rules
    //
    this.clickRuleByIndex = function(index, callback) {

        browser.findElement(webdriver.By.xpath('.//div[contains(@class,"leftBlock")]/div[' + index + ']')).click().then(function() {

            callback();

        });

    };

    //
    //
    //
    this.getCoverageRegressionGraphByIndex = function(index, elem, callback) {
        //$x('.//div[contains(@class,"rightBlock")]/child::div[5]/rules-result-cov-regression//bar-chart/*[name()="svg"]')
        elem.findElement(webdriver.By.xpath('(.//rules-result-cov-regression//bar-chart/*[name()="svg"])[' + index + ']')).then(function(elem) {

            callback(elem);

        });

    };

    //
    // Get the image href for a graph. There are a total of for images (1-4)
    //
    this.getImageSrcByIndex = function(index, elem, callback) {

        // Used because every other image is not displayed
        index += (index - 1);

        elem.findElement(webdriver.By.xpath('(.//*[name()="g"]//*[name()="image"])[' + index + ']')).then(function(elem) {

            elem.getAttribute("href").then(function(val) {

                callback(val);

            });

        });

    };

    //
    // Get the rectangles of graph. There are a total of 2 rectangles in each g element
    //
    this.getRectangleheightByIndex = function(index, elem, callback) {

        // Used because every other image is not displayed
        index += (index - 1);

        elem.findElement(webdriver.By.xpath('(.//*[name()="g"]//*[name()="rect"])[' + index + ']')).then(function(elem) {

            elem.getAttribute("y").then(function(val) {

                callback(val);

            });

        });

    };

    //
    // Get the text in the floating labels. There are a total of four labels (1-4)
    //
    this.getFloatingLabelTextByIndex = function(index, elem, callback) {

        // Used because every other image is not displayed
        index += (index - 1);

        elem.findElement(webdriver.By.xpath('(.//*[name()="g"]//*[contains(@class, "floatingLabels")])[' + index + ']')).then(function(elem) {

            elem.getText().then(function(txt) {

                callback(txt);

            });

        });

    };

    //
    // Get the fill value in the floating labels. There are a total of four labels (1-4) 
    //
    this.getFloatingLabelFillByIndex = function(index, elem, callback) {

        // Used because every other image is not displayed
        index += (index - 1);

        elem.findElement(webdriver.By.xpath('(.//*[name()="g"]//*[contains(@class, "floatingLabels")])[' + index + ']')).then(function(elem) {

            elem.getCssValue('fill').then(function(val) {

                callback(val);

            });

        });

    };

    //
    // Get the D3 Graph X axis label text.
    //
    this.getXAxisLabelTextByIndex = function(index, elem, callback) {

        elem.findElement(webdriver.By.xpath('(.//descendant::*[contains(@class, "x axis")]//*[name()="text"])[' + index + ']')).then(function(elem) {

            elem.getText().then(function(txt) {

                callback(txt);

            });

        });

    };

    //
    // Get the D3 Graph Legend text.
    //
    this.getLegendTextByIndex = function(index, elem, callback) {

        elem.findElement(webdriver.By.xpath('(.//descendant::*[contains(@class, "legend")]//*[name()="text"])[' + index + ']')).then(function(elem) {

            elem.getText().then(function(txt) {

                callback(txt);

            });

        });

    };

    //
    // Log HTML
    //
    this.logHtml = function(elem) {

        elem.getInnerHtml().then(function(txt) {

            log(txt);

        });

    };

    //
    // Log text
    //
    this.logText = function(elem) {

        elem.getText().then(function(txt) {

            log(txt);

        });

    };

};




module.exports = ReportPage;



















log = function(txt) {

    if (process.env.DEBUG == "true") {

        console.log(txt);

    }

};
