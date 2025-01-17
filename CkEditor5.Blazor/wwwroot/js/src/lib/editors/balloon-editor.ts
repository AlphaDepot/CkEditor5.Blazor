import {BalloonEditor, EditorConfig} from "ckeditor5";
import { configFactory } from "../configs/factory";



export class BlazorBalloonEditor extends BalloonEditor {
    static async create(sourceElementOrData: string | HTMLElement, config?: EditorConfig, reference?: any) {

        config = configFactory(config);

        const editor = await super.create(sourceElementOrData, config);

        editor.model.document.on("change:data", async () => {
            await reference.invokeMethodAsync("EditorValueChanged", editor.getData());
        });

        return editor;
    }
}