import Image from "../models/Image";


export default {
    render(image: Image) {
        const apiUrl = process.env.API_URL;
        return {
            id: image.id,
            name: image.path,
            url: `${apiUrl}/uploads/${image.path}`
        }
    }, 
    renderMany(images: Image[]){
        return images.map(image=> this.render(image));
    }
}