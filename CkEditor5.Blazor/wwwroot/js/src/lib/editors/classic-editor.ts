import { ClassicEditor, EditorConfig } from "ckeditor5";
import { configFactory } from "../configs/factory";

export class BlazorClassicEditor extends ClassicEditor {
    // CKEditor 48+ overloads
    static override create(config: EditorConfig): Promise<BlazorClassicEditor>;
    static override create(
        sourceElementOrData: string | HTMLElement,
        config: EditorConfig
    ): Promise<BlazorClassicEditor>;

    // Implementation
    static override async create(
        sourceElementOrDataOrConfig: any,
        config?: EditorConfig,
        reference?: any
    ): Promise<BlazorClassicEditor> {

        config = configFactory(config);
        const editor = await super.create(
            sourceElementOrDataOrConfig,
            config
        ) as BlazorClassicEditor;

        // Word count UI
        const wordCount = editor.plugins.get("WordCount");
        const editorElement = editor.ui.view.editable.element;
        const wordCountElement = editorElement
            ?.closest(".editor-container_classic-editor")
            ?.querySelector(".editor_container__word-count");

        if (wordCountElement) {
            wordCountElement.appendChild(wordCount.wordCountContainer);
        }

        // Blazor callback
        if (reference) {
            editor.model.document.on("change:data", async () => {
                await reference.invokeMethodAsync("EditorValueChanged", editor.getData());
            });
        }

        return editor;
    }
}
