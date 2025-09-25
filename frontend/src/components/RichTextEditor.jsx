import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichTextEditor = ({ content, setContent }) => {
  return (
    <div className="border p-3 rounded">
      <CKEditor
        editor={ClassicEditor}
        data={content || ""}
        onChange={(event, editor) => {
          const html = editor.getData();
          setContent(html);
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
          heading: {
            options: [
              { model: "paragraph", title: "Paragraph" },
              { model: "heading1", view: "h1", title: "Heading 1" },
              { model: "heading2", view: "h2", title: "Heading 2" },
              { model: "heading3", view: "h3", title: "Heading 3" },
            ],
          },
        }}
      />
    </div>
  );
};

export default RichTextEditor;
