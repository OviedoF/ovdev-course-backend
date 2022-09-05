const path = require('path');
const fs = require('fs-extra');
const cloudinary = require(path.join(__dirname, '..', 'config', 'cloudinary.config'))
const Course = require(path.join(__dirname, '..', 'models', 'course.model'));
const Topic = require(path.join(__dirname, '..', 'models', 'topic.model'));
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const usersController = {};

usersController.addCourseInProcess = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const coursesFilter = user.coursesInProcess.filter(el => el.course != req.body.courseId);

        const coursesArray = [
            ...coursesFilter,
            {
                course: req.body.courseId,
                lastTopic: req.body.lastTopicId
            }
        ];

        const userActualize = await User.findByIdAndUpdate(req.params.id, {
            coursesInProcess: coursesArray
        }, {
            new: true
        });

        console.log(userActualize);

        res.status(200).send({ok: true});

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

usersController.getCoursesInProcess = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const courses = [];

        for (const course of user.coursesInProcess) {
            const courseFinded = await Course.findById(course.course);
            const topicFinded = await Topic.findById(course.lastTopic);

            courses.push({
                course: courseFinded,
                lastTopic: topicFinded
            })
        }

        res.status(200).send(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

usersController.handleFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('favs');
        const topic = await Topic.findById(req.params.topicId);

        const newFavs = [topic._id];

        user.favs.forEach(el => {
            newFavs.push(el._id);

            if(el._id.toString() == topic._id.toString()){
                newFavs.pop();
                newFavs.shift();
            }
        });

        await User.findByIdAndUpdate(req.params.id, {
            favs: newFavs
        })

        res.status(200).send('#EF3969');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

usersController.getFavs = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, {favs: true});

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


usersController.getCompleteFavs = async (req, res) => {
    try {
        const favsFromDB = await User.findById(req.params.id, {favs: true}).populate('favs');

        const favsComplete = [];

        for (const fav of favsFromDB.favs) {
            const course = await Course.findById(fav.course);
            favsComplete.push({
                ...fav._doc,
                course: course
            })            
        };

        console.log(favsComplete);
        res.status(200).send(favsComplete);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = usersController;