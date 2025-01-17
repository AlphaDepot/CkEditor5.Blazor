This package, CKEditor5.Blazor, is a Blazor wrapper for CKEditor 5, a rich text editor. It allows seamless integration of CKEditor 5 into Blazor applications, providing various editor variants such as Classic, Inline, Balloon, and Document editors. The package includes necessary configurations and JavaScript interop to facilitate the use of CKEditor 5 within Blazor components.

## Installation 

### Install the package
```bash
dotnet add package CkEditor5.Blazor
```

### Add the stylesheet to your `App.razor` or `index.html`
```html
<link rel="stylesheet" href="./_content/CkEditor5.Blazor/css/ckeditor5.css" />
```
Also add the premium features stylesheet if you are using premium plugins:
```html
<link rel="stylesheet" href="./_content/CkEditor5.Blazor/css/ckeditor5-premium-features.css" />
```

### Usage
For simple usage without data handling, use the component like this:
```html
<CkEditor5  />
```

To handle data changes, use the OnValueChange event handler:
```html
<CkEditor5 OnValueChange="HandleChangeMethod" />
```

You can also set initial data using the Value parameter:
```html
<CkEditor5 Value="InitialData" OnValueChange="HandleChangeMethod" />
```

Alternatively, use a ref on the component to get and set data with the GetData and SetData methods:
```html
<CkEditor5 @ref="editor" />
```
```csharp
@code {
    // The editor is a textarea element
    private ElementReference editor;

    private void HandleChangeMethod(string data)
    {
        // Handle the data
    }

    private void SetDataMethod()
    {
        editor.SetData("Some data");
    }
    
    private void GetSomeData()
    {
        string data = editor.GetData();
    }
}
```



## Configuration
By default, the editor uses a default configuration. You can customize it by setting your own configuration:
```html
<CkEditor5 Configuration="@MyConfiguration" />
```

```csharp
@code {
    private CkEditorConfiguration MyConfiguration = new CkEditorConfiguration
    {
        ["toolbar"] = new
        {
            Items = new[]
            {
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "undo",
                "redo"
            }
        },
        ["plugins"] = new object[]
        {
            "Heading",
            "Bold",
            "Italic",
            "Link",
            "List",
            "Undo",
            "Redo"
        },
         ["fontFamily"] = new { supportAllValues = true },
         // ...etc 
    };
}
```
For a full list of configuration options, refer to the [CKEditor5 documentation](https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html). You can also view the default configuration in the `CkEditor5Configuration.cs` file in the source code, which includes the full list of open-source configuration options used by default.

## API
The component has the following parameters:

| Parameter      | Type            | Description                                                                                                                                                         |
|----------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Id`           | `string?`       | The ID of the editor element.                                                                                                                                       |
| `Class`        | `string?`       | The CSS class of the editor element.                                                                                                                                |
| `OnValueChanged` | `EventCallback<string>` | Event callback that is triggered when the editor value changes.                                                                                                     |
| `Configuration` | `CkEditorConfiguration` | The configuration object for the CKEditor instance.                                                                                                                 |
| `Variant`      | `EditorVariant` | The variant of the CKEditor, the options available are: <br/>  `ClassicEditor` , `InlineEditor`, `BalloonEditor`, `DocumentEditor` <br/> The default is ClassicEditor. |
| `Value`        | `string`        | The initial value/content of the editor.                                                                                                                            |
| `ToggleReadOnly`   | `bool`        | Toggles the editor between read-only and editable mode.                                                                                                             |
|`SetData(string data)`| `void`       | Sets the data of the editor.                                                                                                                                        |
|`GetData()`     | `string`        | Gets the data of the editor.                                                                                                                                        |

## Versioning
The initial version is 9.44.1, which refers to .NET version 9, CKEditor5 major version 44, and the last number is reserved for work done in this project. This versioning scheme makes it easier to select the appropriate version for your project or so I think :)

## Premium Plugins
The premium plugins are imported and can be configured, but they have not been tested yet. Please note that some features require special configuration or additional JS files to function correctly. Refer to the CKEditor5 documentation for more information.
#### SaaS features
* Real-time collaboration
* CKBox
* Export to PDF
* Export to Word
* Import from Word
#### Standalone/offline plugins
* Asynchronous collaboration features, including:
* Track changes
* Comments
* Revision history
* AI Assistant
* Case change
* Document outline
* Format painter
* Merge fields
* Multi-level list
* Pagination
* Paste from Office enhanced
* Slash commands
* Table of contents
* Templates

## Issues
In the CKEditor component, anything other than the `ClassicEditor` cannot use a `textarea`. Hence, when passing data, it has to be in a regular tag like a `div`. Unfortunately, you have to cast the data from a string to a `MarkupString`, which can cause errors when updating the field unless the markup `@((MarkupString)Value)` is surrounded by tags. I chose a non-existent tag like `<x>` in `<x>@((MarkupString)Value)</x>` because in tests it appears to disappear after the first load. If this is not done, the following errors may repeatedly appear in the console:

- `TypeError: Cannot read properties of null (reading 'removeChild')`
- `TypeError: Cannot read properties of undefined (reading 'parentNode')`

If you have a solution to this, let me know.

## Third-party plugins
If you require a third-party plugin, please inform me, and I will add it to the project. Alternatively, you can create a pull request with the necessary changes, and I will review and merge it. 
Note the plugin must be compatible with the latest version of CKEditor5 in this project.