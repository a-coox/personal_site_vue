const imagemin = require('imagemin');
const pngToJpeg = require('png-to-jpeg');

imagemin(['public/img/projects/*.png'], 'public/img', {
    plugins: [
        pngToJpeg({quality: 95})
    ]
}).then((files) => {
    // Please keep in mind that all files now have the wrong extension
    // You might want to change them manually
    console.log('PNGs converted to JPEGs:', files);
});