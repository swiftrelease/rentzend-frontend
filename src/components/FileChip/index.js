import React from 'react';
import Chip from '@material-ui/core/Chip';
import ImageIcon from '@material-ui/icons/Image'
import PdfIcon from '@material-ui/icons/PictureAsPdf'
import FileIcon from '@material-ui/icons/Description'

const getIcon = type => {
  if (type.indexOf('image') === 0) return <ImageIcon />;
  if (type === 'application/pdf') return <PdfIcon />;
  return <FileIcon />;
};

const FileChip = ({ file, onDelete }) => (
  <Chip
    icon={getIcon(file.type)}
    label={file.name}
    onDelete={onDelete}
  />
);

export default FileChip;
