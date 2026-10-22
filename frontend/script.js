const noteForm =
    document.getElementById("noteForm");

const responseMessage =
    document.getElementById("responseMessage");


noteForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const title =
        document.getElementById("title").value;

    const content =
        document.getElementById("content").value;


//   const API_URL = "https://quick-notes-saver-vi4b.onrender.com/";
const API_URL = "https://quick-notes-saver-vi4b.onrender.com";


    try {

        const response = await fetch(
            `${API_URL}/api/notes`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title,
                    content
                })
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            responseMessage.textContent =
                "Note saved successfully!";

            noteForm.reset();

        } else {

            responseMessage.textContent =
                data.message;
        }


    } catch (error) {

        console.log(error);

        responseMessage.textContent =
            "Unable to connect to server.";
    }

});