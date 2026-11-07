import React, { useRef, useEffect } from 'react';
import { Space, Tooltip } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';

interface RichTextEditorProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write detailed film synopsis, director notes, or narrative story...',
  minHeight = 180,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);

  // Sync incoming value to contentEditable without resetting cursor
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      const html = editorRef.current.innerHTML;
      onChange?.(html);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  };

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  const handleInsertLink = () => {
    const url = prompt('Enter link URL (e.g. https://...):');
    if (url) {
      exec('createLink', url);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #CBD5E1',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
      }}
    >
      {/* ─── Rich Toolbar ─── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 12px',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          flexWrap: 'wrap',
        }}
      >
        <Space size={3}>
          <Tooltip title="Undo">
            <button
              type="button"
              onClick={() => exec('undo')}
              style={toolBtnStyle}
            >
              <UndoOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Redo">
            <button
              type="button"
              onClick={() => exec('redo')}
              style={toolBtnStyle}
            >
              <RedoOutlined />
            </button>
          </Tooltip>
        </Space>

        <span style={dividerStyle}>|</span>

        <Space size={3}>
          <Tooltip title="Heading 1">
            <button
              type="button"
              onClick={() => exec('formatBlock', '<h1>')}
              style={{ ...toolBtnStyle, fontWeight: 700, fontSize: 12 }}
            >
              H1
            </button>
          </Tooltip>
          <Tooltip title="Heading 2">
            <button
              type="button"
              onClick={() => exec('formatBlock', '<h2>')}
              style={{ ...toolBtnStyle, fontWeight: 700, fontSize: 12 }}
            >
              H2
            </button>
          </Tooltip>
          <Tooltip title="Normal Paragraph">
            <button
              type="button"
              onClick={() => exec('formatBlock', '<p>')}
              style={{ ...toolBtnStyle, fontWeight: 600, fontSize: 12 }}
            >
              P
            </button>
          </Tooltip>
        </Space>

        <span style={dividerStyle}>|</span>

        <Space size={3}>
          <Tooltip title="Bold">
            <button
              type="button"
              onClick={() => exec('bold')}
              style={toolBtnStyle}
            >
              <BoldOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Italic">
            <button
              type="button"
              onClick={() => exec('italic')}
              style={toolBtnStyle}
            >
              <ItalicOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Underline">
            <button
              type="button"
              onClick={() => exec('underline')}
              style={toolBtnStyle}
            >
              <UnderlineOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Strikethrough">
            <button
              type="button"
              onClick={() => exec('strikeThrough')}
              style={toolBtnStyle}
            >
              <StrikethroughOutlined />
            </button>
          </Tooltip>
        </Space>

        <span style={dividerStyle}>|</span>

        <Space size={3}>
          <Tooltip title="Align Left">
            <button
              type="button"
              onClick={() => exec('justifyLeft')}
              style={toolBtnStyle}
            >
              <AlignLeftOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Align Center">
            <button
              type="button"
              onClick={() => exec('justifyCenter')}
              style={toolBtnStyle}
            >
              <AlignCenterOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Align Right">
            <button
              type="button"
              onClick={() => exec('justifyRight')}
              style={toolBtnStyle}
            >
              <AlignRightOutlined />
            </button>
          </Tooltip>
        </Space>

        <span style={dividerStyle}>|</span>

        <Space size={3}>
          <Tooltip title="Bullet List">
            <button
              type="button"
              onClick={() => exec('insertUnorderedList')}
              style={toolBtnStyle}
            >
              <UnorderedListOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Numbered List">
            <button
              type="button"
              onClick={() => exec('insertOrderedList')}
              style={toolBtnStyle}
            >
              <OrderedListOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Insert Link">
            <button
              type="button"
              onClick={handleInsertLink}
              style={toolBtnStyle}
            >
              <LinkOutlined />
            </button>
          </Tooltip>
        </Space>
      </div>

      {/* ─── Editable Body ─── */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        style={{
          minHeight,
          padding: '14px 16px',
          outline: 'none',
          fontSize: 14,
          lineHeight: 1.7,
          color: '#1E293B',
          overflowY: 'auto',
          maxHeight: 400,
        }}
      />
    </div>
  );
}

const toolBtnStyle: React.CSSProperties = {
  width: 30,
  height: 30,
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  borderRadius: 6,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#475569',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const dividerStyle: React.CSSProperties = {
  color: '#CBD5E1',
  userSelect: 'none',
  padding: '0 2px',
};

