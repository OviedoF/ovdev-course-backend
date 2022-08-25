const path = require('path');
const fs = require('fs-extra');
const cloudinary = require(path.join(__dirname, '..', 'config', 'cloudinary.config'))
const Course = require(path.join(__dirname, '..', 'models', 'course.model'));
const coursesController = {};

coursesController.getCourses = async (req, res) => {
    try {
        const allCourses = await Course.find();

        res.status(200).send(allCourses);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

coursesController.getCourseByDirname = async (req, res) => {
    try {
        const course = await Course.findOne({dirname: req.params.dirname}).populate("topics");

        res.status(200).send(course);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

coursesController.postCourse = async (req, res) => {
    try {
        const alreadyCourse = await Course.findOne({dirname: req.body.dirname});
        if(alreadyCourse) return res.status(400).send('Ya existe un curso con ese dirname.');

        const image = req.files[0];
        const toCloudinary = await cloudinary.v2.uploader.upload(image.path);
        fs.unlink(req.files[0].path);

        const newCourse = new Course({
            ...req.body,
            imageId: toCloudinary.public_id,
            imageUrl: toCloudinary.url
        });

        const courseSaved = await newCourse.save();

        if(!fs.existsSync(`src/markdown/${courseSaved.dirname}`)){
            fs.mkdir(`src/markdown/${courseSaved.dirname}`)
        }

        res.status(200).send(courseSaved);

    } catch (error) {
        fs.unlink(req.files[0].path);
        console.log(error);
        res.status(500).send(error);
    }
}

coursesController.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;

        const courseFinded = await Course.findById(id);
        if(!courseFinded) return res.status(404).send('No se ha encontrado ningún curso con ese id.');

        console.log(courseFinded);

        await cloudinary.uploader.destroy(courseFinded.imageId, function(result) { console.log(result) })

        if(fs.existsSync(`src/markdown/${courseFinded.dirname}`)){
            fs.rm(`src/markdown/${courseFinded.dirname}`, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
            });
        };

        await Course.findByIdAndRemove(id);

        res.status(200).send(`${courseFinded.dirname} is deleted!`);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

coursesController.putCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.files[0];

        const courseFinded = await Course.findById(id);
        if(!courseFinded) return res.status(404).send('No se ha encontrado ningún curso con ese id.');

        await cloudinary.uploader.destroy(courseFinded.imageId, function(result) { 
            console.log(result) 
        });

        const imageUpload = await cloudinary.v2.uploader.upload(image.path);
        fs.unlink(req.files[0].path);

        const updatedourse = await Course.findByIdAndUpdate(id, {
            ...req.body,
            imageId: imageUpload.public_id,
            imageUrl: imageUpload.url
        }, {
            new: true
        });

        res.status(200).send(updatedourse);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = coursesController;