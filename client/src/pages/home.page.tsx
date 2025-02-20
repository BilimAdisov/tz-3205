import { Button } from "antd";
import { useState } from "react";
import { ModalComponent } from "../components/UI/modal";
import CreateUrlForm from "../components/modules/create-url";
import RenderUrl from "../components/modules/render-url";
import Documentation from "../components/modules/documentation";

const Home: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-xl">Тестовое задание: 3205.team</h1>
      <div className="flex justify-end">
        <Button onClick={() => setIsModal(true)} size="large" type="primary">
          Добавить новый
        </Button>
      </div>
      <div>
        <Documentation />
      </div>
      <div>
        <RenderUrl />
      </div>
      <ModalComponent
        active={isModal}
        handleClose={() => setIsModal(false)}
        title="Создать новый url"
        footer={false}
        children={<CreateUrlForm handleClose={() => setIsModal(false)} />}
      />
    </div>
  );
};

export default Home;
