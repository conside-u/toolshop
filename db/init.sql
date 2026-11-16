-- Виконується автоматично при першому запуску контейнера Postgres
CREATE TABLE IF NOT EXISTS items (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO items (name) VALUES
  ('Фрезер ручний 1200 Вт'),
  ('Циркулярна пила 1800 Вт'),
  ('Шуруповерт акумуляторний 18 В'),
  ('Рейсмусовий верстат 305 мм'),
  ('Шліфмашина ексцентрикова 125 мм');
