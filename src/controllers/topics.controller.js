const path = require('path');
const fs = require('fs-extra');
const cloudinary = require(path.join(__dirname, '..', 'config', 'cloudinary.config'))
const Course = require(path.join(__dirname, '..', 'models', 'course.model'));
const Topic = require(path.join(__dirname, '..', 'models', 'topic.model'));
const topicsController = {};

topicsController.getTopics = async (req, res) => {
    try {
        const allTopics = await Topic.find();

        res.status(200).send(allTopics);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

topicsController.getTopicByFilename = async (req, res) => {
    try {
        const courseId = await Course.findOne({dirname: req.params.dirname}, {_id: true});

        if(!courseId) res.status(404).send('No se ha encontrado el curso');

        const TopicFinded = await Topic.findOne({
            $and: [
                { filename: req.params.filename },
                { course: courseId }
            ]
        }).populate("course");

        if(!TopicFinded) res.status(404).send('No se ha encontrado tu tópico');

        const folderMdName = TopicFinded.course.dirname;

        const infoFile = fs.readFileSync(`src/markdown/${folderMdName}/${TopicFinded.filename}.md`, 'UTF-8');

        res.status(200).json({
            topic: TopicFinded,
            content: infoFile
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

topicsController.postTopic = async (req, res) => {
    try {
        const courseName = req.body.course;
        const courseFinded = await Course.findOne({name: courseName});

        if(!courseFinded) res.status(404).send('No se ha encontrado el curso');

        const urlMarkdownFile = `src/markdown/${courseFinded.dirname}/${req.body.filename}.md`;

        if(!fs.existsSync(urlMarkdownFile)){
            fs.writeFileSync(urlMarkdownFile, 'contenido');
        };

        const newTopic = new Topic({
            ...req.body,
            course: courseFinded._id
        })

        await Course.findByIdAndUpdate(courseFinded._id, {
            topics: [
                ...courseFinded.topics,
                newTopic._id
            ]
        });

        const topicSaved = await newTopic.save();

        res.status(200).send(topicSaved);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

topicsController.putTopicContent = async (req, res) => {
    try {
        const fileUrl = `src/markdown/${req.params.dirname}/${req.params.filename}.md`;

        fs.writeFile(fileUrl, req.body.content)
            .then(() => {
                console.log('archivo actualizado: ' + fileUrl);
                res.status(200).send('Perfecto! Se ha actualizado tu archivo');
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            })
    } catch (error) {

        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = topicsController;