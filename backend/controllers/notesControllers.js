import Note from "../models/Note.js"

//CREATE

export const createNote = async (req, res) => {
    try {

        console.log("Received data:", req.body);

        const { title, content } = req.body;

        const note = await Note.create({
            title,
            content
        });

        console.log("Note created:", note);

        res.status(201).json({
            message: "Note created successfully",
            data: note
        });

    } catch (error) {

        console.log("CREATE NOTE ERROR:", error);

        res.status(500).json({
            message: "Error creating note",
            error: error.message
        });
    }
};

//READ ALL

export const getNotes = async(req,res)=>{
    try{
        const Notes =await Notes.find()
       res.status(200).json({
        data:Notes
       })
    }catch(error){
        res.status(500).json({
            message:"Error fetching notes",
            error:error.message
        })
    }
}

export const getNoteById = async(req,res)=>{
    try{
        const Note =await Note.findById(req.params.id)
        if(!Note){
            return res.status(404).json({
                message:"Note not found"
            })
        }
        res.status(200).json({
            data:Note
        })
    }
    catch(error){
        res.status(500).json({
            message:"error fetching note"
        })
    }
}

//UPDATE

export const updateNote =async(req,res)=>{
    try{
        const Note =await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )
        if(!Note){
            return res.status(404).json({
                message:"note not found"
            })
        }
        res.status(200).json({
            message:"Notes Updated successfully",
            data:Note
        })
    }
    catch(error){
        res.status(500).json({
            message:"Error updating notes"
        })
    }
}

//DELETE

export const deleteNote =async(req,res)=>{
    try{
        const Note =await Note.findByIdAndDelete(req.params.id)
            
        if(!Note){
            return res.status(404).json({
                message:"Note not found"
            })
        }
        res.status(200).json({
            message:"note deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message:"error deleting note",
            error:error.message
        })
    }
}