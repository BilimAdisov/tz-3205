import {
  DeleteOutlined,
  EyeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";

const Documentation = () => {
  return (
    <div>
      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: "Документация по использованию",
            children: <div>{<Content />}</div>,
          },
        ]}
        style={{ background: "white" }}
      />
    </div>
  );
};

const Content = () => {
  return (
    <div className="flex flex-col">
      <h4 className="text-lg">
        Сначало нужно создать новый элемент, БД пока пустая.
        <br />
        После добавления элемента появится ниже следующие иконки под колонкой
        "действия" в таблице.
      </h4>
      <div className="">
        <PlayCircleOutlined /> - Нажмите чтобы сделать переадресацию через alias
      </div>
      <div className="">
        <EyeOutlined /> - Нажмите чтобы получить информацию с api analytic
      </div>
      <div className="">
        <DeleteOutlined /> - Нажмите чтобы удалить элемент
      </div>
      <div>🙂 IP - Будут получены только после перехода по ссылке</div>
      <div>
        👀 Короткая ссылка (alias) - не обязательна, если не передавать или ест
        такой же, uuid сгенерит название
      </div>
      <div>
        📍 Света в обертке даты - означают их истечение, если{" "}
        <span className="text-red-500">красная</span> то она считается
        истеченной и переход будет заблокирован в frontend, А если{" "}
        <span className="text-green-500">зеленный</span> то срок еще не истек
      </div>
      <h2>🙃 The конец - Спасибо за внимание</h2>
    </div>
  );
};

export default Documentation;
