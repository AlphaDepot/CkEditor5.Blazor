import { InlineEditor, EditorConfig } from "ckeditor5";
import { configFactory } from "../configs/factory";

export class BlazorInlineEditor extends InlineEditor {
    static override create(config: EditorConfig): Promise<BlazorInlineEditor>;
    static override create(
        sourceElementOrData: string | HTMLElement,
        config: EditorConfig
    ): Promise<BlazorInlineEditor>;

    static override async create(
        sourceElementOrDataOrConfig: any,
        config?: EditorConfig,
        reference?: any
    ): Promise<BlazorInlineEditor> {

        config = configFactory(config);

        const editor = await super.create(sourceElementOrDataOrConfig, config) as BlazorInlineEditor;

        if (reference) {
            editor.model.document.on("change:data", async () => {
                await reference.invokeMethodAsync("EditorValueChanged", editor.getData());
            });
        }

        return editor;
    }
}
