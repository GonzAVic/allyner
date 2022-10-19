import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// MATERIAL UI
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <MenuContainer>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FormatBoldIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FormatItalicIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FormatListBulletedIcon fontSize="small" />
      </IconButton>
    </MenuContainer>
  );
};

const Tiptap = ({ onUpdate }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  if (editor) {
    editor.on("update", ({ editor }) => {
      onUpdate(editor.getHTML());
    });

    // if (isReadOnly) editor.setEditable(false);
  }

  return (
    <Container>
      <MenuBar editor={editor} />
      <EditorContent className="content" editor={editor} />
    </Container>
  );
};

const Container = styled("div")({
  background: "#FFFFFF",
  border: "1px solid #DCDFEA",
  borderRadius: 8,

  "& .content": {
    margin: 16,
  },
  "& .ProseMirror:focus-visible": {
    outline: "none",
  },
});

const MenuContainer = styled("div")({
  padding: 2,
  borderBottom: "1px solid #DCDFEA",

  "& svg": {
    fill: "#98A2B3",
  },
});

export default Tiptap;
