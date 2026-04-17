import { DecoupledEditor, EditorConfig } from "ckeditor5";
import { configFactory } from "../configs/factory";

export class BlazorDecoupledEditor extends DecoupledEditor {
    static override create(config: EditorConfig): Promise<BlazorDecoupledEditor>;
    static override create(
        sourceElementOrData: string | HTMLElement,
        config: EditorConfig
    ): Promise<BlazorDecoupledEditor>;

    static override async create(
        sourceElementOrDataOrConfig: any,
        config?: EditorConfig,
        reference?: any
    ): Promise<BlazorDecoupledEditor> {

        config = configFactory(config);

        const editor = await super.create(sourceElementOrDataOrConfig, config) as BlazorDecoupledEditor;

        const editorElement = editor.ui.view.editable.element;
        const containerElement = editorElement?.closest(".editor-container_document-editor");

        const toolbarElement = containerElement?.querySelector(".editor-container__toolbar");
        if (toolbarElement && editor.ui.view.toolbar.element) {
            toolbarElement.appendChild(editor.ui.view.toolbar.element);
        }

        const menuBarElement = containerElement?.querySelector(".editor-container__menu-bar");
        if (menuBarElement && editor.ui.view.menuBarView.element) {
            menuBarElement.appendChild(editor.ui.view.menuBarView.element);
        }

        if (reference) {
            editor.model.document.on("change:data", async () => {
                await reference.invokeMethodAsync("EditorValueChanged", editor.getData());
            });
        }

        return editor;
    }
}
