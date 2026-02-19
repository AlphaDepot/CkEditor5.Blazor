namespace CkEditor5.Blazor.Models
{
    public class CkEditorConfiguration : Dictionary<string, object>
    {
        public static CkEditorConfiguration Default => GetDefaultConfiguration();
        
        private static CkEditorConfiguration GetDefaultConfiguration()
        {
            var configuration = new CkEditorConfiguration
            {
                ["toolbar"] = GetToolbarConfiguration(),
                ["plugins"] = GetPluginsConfiguration(),
                ["fontFamily"] = new { supportAllValues = true },
                ["fontSize"] = new { options = new object[] { 10, 12, 14, "default", 18, 20, 22 }, supportAllValues = true },
                ["heading"] = GetHeadingConfiguration(),
                ["htmlSupport"] = new { allow = new[] { new { name = "^.*$", styles = true, attributes = true, classes = true } } },
                ["image"] = GetImageConfiguration(),
                ["licenseKey"] = "GPL",
                ["link"] = GetLinkConfiguration(),
                ["list"] = new { properties = new { styles = true, startIndex = true, reversed = true } },
                ["placeholder"] = "Type or paste your content here!",
                ["style"] = GetStyleConfiguration(),
                ["table"] = new { contentToolbar = new[] { "tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties" } },
                ["updateSourceElementOnDestroy"] = true,
                ["fullscreen"] = GetFullscreenConfiguration(),
            };

            return configuration;
        }
        
        private static object GetToolbarConfiguration()
        {
            return new
            {
                items = new[]
                {
                    "sourceEditing","fullscreen", "showBlocks", "findAndReplace", "|", "heading", "style", "|",
                    "fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "|", "bold", "italic",
                    "underline", "strikethrough", "subscript", "superscript", "code", "removeFormat", "|",
                    "specialCharacters", "horizontalLine", "pageBreak", "link", "bookmark", "insertImage",
                    "mediaEmbed", "insertTable", "highlight", "blockQuote", "codeBlock", "htmlEmbed", "|",
                    "alignment", "|", "bulletedList", "numberedList", "todoList", "outdent", "indent"
                },
                shouldNotGroupWhenFull = true
            };
        }

        /// <summary>
        ///  Plugins configuration
        ///  For the full list of options see: <see href="https://ckeditor.com/docs/ckeditor5/latest/api/module_core_plugincollection.html" />
        /// </summary>
        private static object[] GetPluginsConfiguration()
        {
            return
            [
                "Alignment","Fullscreen", "Autoformat", "AutoImage", "Autosave", "Base64UploadAdapter", "BlockQuote", "Bold",
                "Bookmark", "CloudServices", "Code", "CodeBlock", "Essentials", "FindAndReplace", "FontBackgroundColor",
                "FontColor", "FontFamily", "FontSize", "FullPage", "GeneralHtmlSupport", "Heading", "Highlight",
                "HorizontalLine", "HtmlComment", "HtmlEmbed", "ImageBlock", "ImageCaption", "ImageInline", "ImageInsert",
                "ImageInsertViaUrl", "ImageResize", "ImageStyle", "ImageTextAlternative", "ImageToolbar", "ImageUpload",
                "Indent", "IndentBlock", "Italic", "Link", "LinkImage", "List", "ListProperties", "MediaEmbed",
                "PageBreak", "Paragraph", "PasteFromOffice", "RemoveFormat", "ShowBlocks", "SourceEditing",
                "SpecialCharacters", "SpecialCharactersArrows", "SpecialCharactersCurrency", "SpecialCharactersEssentials",
                "SpecialCharactersLatin", "SpecialCharactersMathematical", "SpecialCharactersText", "Strikethrough",
                "Style", "Subscript", "Superscript", "Table", "TableCaption", "TableCellProperties", "TableColumnResize",
                "TableProperties", "TableToolbar", "TextTransformation", "TodoList", "Underline", "WordCount"
            ];
        }

        /// <summary>
        ///  Heading configuration
        ///  For the full list of options see: <see href="https://ckeditor.com/docs/ckeditor5/latest/api/module_heading_headingconfig.html" />
        /// </summary>
        private static object GetHeadingConfiguration()
        {
            return new
            {
                options = new object[]
                {
                    new { model = "paragraph", title = "Paragraph", @class = "ck-heading_paragraph" },
                    new { model = "heading1", view = "h1", title = "Heading 1", @class = "ck-heading_heading1" },
                    new { model = "heading2", view = "h2", title = "Heading 2", @class = "ck-heading_heading2" },
                    new { model = "heading3", view = "h3", title = "Heading 3", @class = "ck-heading_heading3" },
                    new { model = "heading4", view = "h4", title = "Heading 4", @class = "ck-heading_heading4" },
                    new { model = "heading5", view = "h5", title = "Heading 5", @class = "ck-heading_heading5" },
                    new { model = "heading6", view = "h6", title = "Heading 6", @class = "ck-heading_heading6" }
                }
            };
        }

        /// <summary>
        ///  Image configuration
        ///  For the full list of options see: <see href="https://ckeditor.com/docs/ckeditor5/latest/api/module_image_imageconfig.html" />
        /// </summary>
        private static object GetImageConfiguration()
        {
            return new
            {
                toolbar = new[]
                {
                    "toggleImageCaption", "imageTextAlternative", "|", "imageStyle:inline", "imageStyle:wrapText",
                    "imageStyle:breakText", "|", "resizeImage"
                }
            };
        }

        /// <summary>
        ///  Link configuration
        ///  For the full list of options see: <see href="https://ckeditor.com/docs/ckeditor5/latest/api/module_link_linkconfigg.html" />
        /// </summary>
        private static object GetLinkConfiguration()
        {
            return new
            {
                addTargetToExternalLinks = true,
                defaultProtocol = "https://",
                decorators = new
                {
                    toggleDownloadable = new
                    {
                        mode = "manual",
                        label = "Downloadable",
                        attributes = new { download = "file" }
                    }
                }
            };
        }

        /// <summary>
        ///  Style configuration
        ///  For the full list of options see: <see href="https://ckeditor.com/docs/ckeditor5/latest/api/module_style_styleconfig.html" />
        /// </summary>
        private static object GetStyleConfiguration()
        {
            return new
            {
                definitions = new[]
                {
                    new { name = "Article category", element = "h3", classes = new[] { "category" } },
                    new { name = "Title", element = "h2", classes = new[] { "document-title" } },
                    new { name = "Subtitle", element = "h3", classes = new[] { "document-subtitle" } },
                    new { name = "Info box", element = "p", classes = new[] { "info-box" } },
                    new { name = "Side quote", element = "blockquote", classes = new[] { "side-quote" } },
                    new { name = "Marker", element = "span", classes = new[] { "marker" } },
                    new { name = "Spoiler", element = "span", classes = new[] { "spoiler" } },
                    new { name = "Code (dark)", element = "pre", classes = new[] { "fancy-code", "fancy-code-dark" } },
                    new { name = "Code (bright)", element = "pre", classes = new[] { "fancy-code", "fancy-code-bright" } }
                }
            };
        }

        /**
         *  Fullscreen configuration
         *  For the full list of options see: <see href="https://ckeditor.com/docs/ckeditor5/latest/api/module_fullscreen_fullscreenconfig.html" />
         */
        private static object GetFullscreenConfiguration()
        {
            return new
            {
                menuBar = new { isVisible = true },
                toolbar = new { shouldNotGroupWhenFull = true },
            };
        }
    }
}
