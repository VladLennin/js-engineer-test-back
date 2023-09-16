import {HttpException, Injectable} from "@nestjs/common";
import * as fs from "fs"
import * as path from "path"
import * as uuid from "uuid"
import {InjectModel} from "@nestjs/sequelize";
import {Image} from "./image.model"

@Injectable()
export class ImageService {

    constructor(@InjectModel(Image) private imageRepository: typeof Image) {
    }

    async createImages(files: any, heroId: number) {
        try {
            for (let i = 0; i < files.length; i++) {
                const filename = uuid.v4() + files[i].name + "." + files[i].originalname.split('.').pop()
                const filepath = path.resolve(__dirname, "..", "..", "uploads")

                if (!fs.existsSync(filepath)) {
                    fs.mkdirSync(filepath, {recursive: true})
                }

                fs.writeFileSync(path.join(filepath, filename), files[i].buffer)

                await this.imageRepository.create({href: filename, heroId: heroId})
            }
        } catch (e) {
            throw new HttpException("Error during uploading file!", 500)
        }
    }

    async getImageByPk(id: number) {
        return this.imageRepository.findByPk(id)
    }

    async removeImg(id: number) {
        const img = await this.imageRepository.findByPk(id)
        if (!img) {
            throw new HttpException("Image doesnt exist!", 404)
        }
        const filepath = path.resolve(__dirname, "..", "..", "uploads", img.href)

        fs.unlink(filepath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
        return await img.destroy()
    }

}