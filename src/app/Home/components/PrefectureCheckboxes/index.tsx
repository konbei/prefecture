"use client"
import './styles.css';
import React, { useState } from 'react';
import { Prefecture } from '../../types';

const PrefectureCheckboxes: React.FC<{ prefectures: Prefecture[], onChange: (prefCode: number, checked: boolean) => void }> = ({ prefectures, onChange }) => {
    const [checkedPrefectures, setCheckedPrefectures] = useState<number[]>([]);

    const handleChange = (prefCode: number, checked: boolean) => {
        if (checked) {
            setCheckedPrefectures([...checkedPrefectures, prefCode]);
        } else {
            setCheckedPrefectures(checkedPrefectures.filter((code) => code !== prefCode));
        }
        onChange(prefCode, checked);
    };

    return (
        <div className="prefecture-checkboxes">
            {prefectures.map((prefecture) => (
                <label key={prefecture.prefCode} className="prefecture-label">
                    <input
                        type="checkbox"
                        value={prefecture.prefCode}
                        checked={checkedPrefectures.includes(prefecture.prefCode)}
                        onChange={(e) => handleChange(prefecture.prefCode, e.target.checked)}
                    />
                    {prefecture.prefName}
                </label>
            ))}
        </div>
    );
};

export default PrefectureCheckboxes;