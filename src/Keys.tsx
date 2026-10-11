import { useState, useEffect, useRef } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const { initialData, sorting } = props;

    const [items, setItems] = useState<IItem[]>(initialData);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [draftName, setDraftName] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const sortedItems = [...items].sort((a, b) =>
        sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );

    useEffect(() => {
        if (editingId !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    const handleNameClick = (item: IItem) => {
        setEditingId(item.id);
        setDraftName(item.name);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, name: draftName } : item,
                ),
            );
            setEditingId(null);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            <ul>
                {sortedItems.map((item) => (
                    <li key={item.id}>
                        {editingId === item.id ? (
                            <input
                                ref={inputRef}
                                value={draftName}
                                onChange={(e) => setDraftName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <span onClick={() => handleNameClick(item)}>
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}