const note_model = require('../models/note-model');
const note_views = require('../views/note-views');

const get_notes = (req, res, next) => {
    const user = req.user;
    user.populate('notes')
        .execPopulate()
        .then(() => {
            console.log('user:', user);
            let data = {
                user_name: user.name,
                notes: user.notes
            };
            let html = note_views.notes_view(data);
            res.send(html);
        });
};

const post_delete_note = (req, res, next) => {
    const user = req.user;
    const note_id_to_delete = req.body.note_id;

    //Remove note from user.notes
    const updated_notes = user.notes.filter((note_id) => {
        return note_id != note_id_to_delete;
    });
    user.notes = updated_notes;

    //Remove note object from database
    user.save().then(() => {
        note_model.findByIdAndRemove(note_id_to_delete).then(() => {
            res.redirect('/');
        });
    });
};

const get_note = (req, res, next) => {
    const note_id = req.params.id;
    note_model.findOne({
        _id: note_id
    }).then((note) => {
        let data = {
            text: note.text
        };
        let html = note_views.note_view(data);
        res.send(html);
    });
};

const post_note = (req, res, next) => {
    const user = req.user;
    let new_note = note_model({
        text: req.body.note
    });
    new_note.save().then(() => {
        console.log('note saved');
        user.notes.push(new_note);
        user.save().then(() => {
            return res.redirect('/');
        });
    });
};


module.exports.get_notes = get_notes;
module.exports.get_note = get_note;
module.exports.post_note = post_note;
module.exports.post_delete_note = post_delete_note;