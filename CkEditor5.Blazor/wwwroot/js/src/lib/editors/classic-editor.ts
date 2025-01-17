import {ClassicEditor, EditorConfig,} from "ckeditor5";
import { configFactory } from "../configs/factory";


export class BlazorClassicEditor extends ClassicEditor {
    static async create(sourceElementOrData: string | HTMLElement, config?: EditorConfig, reference?: any) {
        
        config = configFactory(config);

        const editor = await super.create(sourceElementOrData, config);

        const wordCount = editor.plugins.get('WordCount');
        const editorElement = editor.ui.view.editable.element;
        const wordCountElement = editorElement?.closest('.editor-container_classic-editor')?.querySelector('.editor_container__word-count');
        if (wordCountElement) {
            wordCountElement.appendChild(wordCount.wordCountContainer);
        }
        
        editor.model.document.on("change:data", async () => {
            await reference.invokeMethodAsync("EditorValueChanged", editor.getData());
        });
        
        return editor;
    }
}



