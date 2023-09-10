import {ID,storage} from "@/appwrite"

const uploadImage = async (file:File)=>{
    if(!file) return;

    const fileUploaded = await storage.createFile(
        "64f858935c7b9814d555",
        ID.unique(),
        file
    )
    return fileUploaded;
}

export default uploadImage