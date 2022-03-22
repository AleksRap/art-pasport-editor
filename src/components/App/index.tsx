import React, { FC, useCallback, useState } from 'react';
import { Canvas, Checkbox, Input } from '$components';
import classes from './styles.module.scss';

export const App: FC = () => {
  const [name, setName] = useState('');
  const handleChangeName = useCallback((e) => {
    setName(e.currentTarget.value);
  }, []);

  const [materials, setMaterials] = useState('');
  const handleChangeMaterials = useCallback((e) => {
    setMaterials(e.currentTarget.value);
  }, []);

  const [placeAndYear, setPlaceAndYear] = useState('');
  const handleChangePlaceAndYear = useCallback((e) => {
    setPlaceAndYear(e.currentTarget.value);
  }, []);

  const [isOriginal, setOriginal] = useState(false);
  const handleChangeOriginal = useCallback(() => {
    setOriginal((state) => !state);
  }, []);

  const [isLimited, setLimited] = useState(false);
  const handleChangeLimited = useCallback(() => {
    setLimited((state) => !state);
  }, []);

  const [img, setImg] = useState<Blob | null>(null);
  const handleChangeImg = useCallback((e) => {
    setImg(e.target.files[0]);
  }, []);

  const handleReset = useCallback(() => {
    setName('');
    setMaterials('');
    setPlaceAndYear('');
    setOriginal(false);
    setLimited(false);
    setImg(null);
  }, []);

  const handleDownloadJpg = useCallback(() => {
    const canvas = document.getElementById('passport-hidden') as HTMLCanvasElement | null;

    if (canvas) {
      const img = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = img;
      link.download = 'passport.jpg';
      link.click();
    }
  }, []);

  return (
    <div className={classes.app}>
      <h1 className={classes.title}>Редактор паспорта картины</h1>

      <div className={classes.inputs}>
        <Input label="Имя" placeholder="Имя" value={name} onChange={handleChangeName} />

        <Input
          label="Место и год создания"
          placeholder="Место и год создания"
          value={placeAndYear}
          onChange={handleChangePlaceAndYear}
        />

        <Input
          label="Материалы"
          placeholder="Материалы"
          value={materials}
          onChange={handleChangeMaterials}
        />

        <Checkbox label="Оригинал" isChecked={isOriginal} onChange={handleChangeOriginal} />

        <Checkbox
          label="Лимитированная серия"
          isChecked={isLimited}
          onChange={handleChangeLimited}
        />

        <input type="file" onChange={handleChangeImg} />
      </div>

      <Canvas
        image={img}
        name={name}
        materials={materials}
        placeAndYear={placeAndYear}
        isLimited={isLimited}
        isOriginal={isOriginal}
        className={classes.canvas}
      />

      <Canvas
        isHidden
        image={img}
        name={name}
        materials={materials}
        placeAndYear={placeAndYear}
        isLimited={isLimited}
        isOriginal={isOriginal}
        className={classes.canvas}
      />

      <div className={classes.btnWrap}>
        <button onClick={handleReset}>Сбросить</button>
        <button onClick={handleDownloadJpg}>Скачать JPG</button>
        <a href="https://www.rgb2cmyk.org/">Перейти на сайт подготовки к печати</a>
      </div>
    </div>
  );
};
