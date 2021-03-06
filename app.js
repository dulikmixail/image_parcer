const download = require('download-file');

const imageDirectory = `./images/${new Date().getTime()}/`;

function generateArrayImageName(startIndex = 0, count = 1) {
    const res = [];
    const endIndex = startIndex - count;
    for (let i = startIndex; i > endIndex; i--) {
        res.push(i.toString(36).toUpperCase())
    }
    return res;
}

function downloadImage(imageName, callback) {
    // const imageFullName = `${imageName}.png`;
    // const url = `https://i.paste.pics/${imageFullName}`;
    const imageFullName = `${imageName}.jpeg`;
    const url = `https://lp2.hm.com/hmgoepprod?set=source[/70/a4/70a435575fb89a52ccad14ba9e8f3f3285e93573.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[1]&call=url[file:/product/main]`;
    const options = {
        directory: imageDirectory,
        filename: imageFullName
    };
    download(url, options, function (err) {
        callback();
        if (!err) {
            console.log("File: ", imageFullName, " download. Success")
        }
    });
}


function start(startIndex, count, delay = 1000, maxStream = 10) {
    console.log("START");

    if (typeof startIndex === "string") {
        startIndex = parseInt(startIndex, 36)
    } else if (typeof startIndex === "number") {
        startIndex = startIndex ? startIndex : 0
    } else {
        startIndex = 0
    }

    const nameImages = generateArrayImageName(startIndex, count);

    let currentIndex = 0;
    let countStream = 0;
    const timer = setInterval(
        () => {
            if(currentIndex < count) {
                currentIndex++;
                countStream++;
            }
            if (countStream < maxStream) {
                downloadImage(nameImages[currentIndex], () => {
                    countStream--;
                });
            }
            console.log(`${currentIndex * 100 / count}%`);
            if (currentIndex === count && countStream === 0) {
                clearInterval(timer);
                console.log("END", " ", nameImages[nameImages.length - 1]);
            }
        }, delay);
}

start("5LCLU", 100, 300, 10);


