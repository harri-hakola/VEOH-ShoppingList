const notes_view = ((data) => {
    let html = `
    <html>
        <link rel="stylesheet" type="text/css" href="./css/style.css">
        <body>
            Logged in as user: ${data.user.name}
            <form action="/logout" method="POST">
                <button type="submit">Log out</button>
            </form>`;

            data.notes.forEach((note) => {
                //res.write(note.text);            
                //res.write(note.quantity.toString());
                //res.write(note.image_url);
                res.write(`
                <table>
                    <tr>
                        <td><b>Product:</b> ${note.text}</td>
                        <td><b>Quantity:</b>${note.quantity}</td>
                        <td><img src="${note.image_url}" alt="${note.text}"></td>
                    </tr>
                </table>
                <form action="delete-note" method="POST">
                    <input type="hidden" name="note_id" value="${note._id}">
                    <button type="submit">Delete note</button>
                </form>
                `);
            });

            html += `
            <form action="/add-note" method="POST">
                <div>Product name:<br><input type="text" name="note_name"></div>
                <div>Quantity:<br><input type="number" name="note_quantity"></div>
                <div>Image url:<br><input type="text" name="note_url"></div>
                 <button type="submit">Add note</button>
            </form>            
        </html>
        </body>    
        `;
        return html;
        });

        const note_view = (data) => {
            let html = `
            <html>
            <body>
                Note text: ${data.text}
            </body>
            </html>
            `;
            return html;
        };

        module.exports.notes_view = note_view;
        module.exports.note_view = note_view;
