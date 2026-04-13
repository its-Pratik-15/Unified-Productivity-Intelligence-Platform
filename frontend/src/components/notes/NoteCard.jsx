import { Card } from '../common/Card.jsx';
import { formatDateTime } from '../../utils/format';

export const NoteCard = ({ note, onClick }) => {
    return (
        <Card onClick={onClick} className="h-full">
            <h3 className="text-base font-semibold text-[#E2E8F0] mb-2">{note.title}</h3>
            <p className="text-[#94A3B8] text-sm line-clamp-3 mb-3">{note.content}</p>
            <p className="text-xs text-[#94A3B8]">
                Updated {formatDateTime(note.updatedAt)}
            </p>
        </Card>
    );
};
