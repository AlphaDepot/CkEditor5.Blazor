import { BalloonEditor, EditorConfig } from "ckeditor5";
import { configFactory } from "../configs/factory";

export class BlazorBalloonEditor extends BalloonEditor {
    // CKEditor 48+ required overloads
    static override create(config: EditorConfig): Promise<BlazorBalloonEditor>;
    static override create(
        sourceElementOrData: string | HTMLElement,
        config: EditorConfig
    ): Promise<BlazorBalloonEditor>;

    // Implementation
    static override async create(
        sourceElementOrDataOrConfig: any,
        config?: EditorConfig,
        reference?: any
    ): Promise<BlazorBalloonEditor> {

        config = configFactory(config);

        const editor = await super.create(sourceElementOrDataOrConfig, config) as BlazorBalloonEditor;

        if (reference) {
            editor.model.document.on("change:data", async () => {
                await reference.invokeMethodAsync("EditorValueChanged", editor.getData());
            });
        }

        return editor;
    }
}
