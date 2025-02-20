import { useEffect, useState } from "react";
import { Button, Space, TableProps, Tag, Tooltip } from "antd";
import { IDataType } from "../../../types/table.interface";
import {
  EyeOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import IconButtonComponent from "../../UI/icon-button";
import { TableComponent } from "../../UI/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteShortUrl,
  getAllUrls,
  getShortUrlInfo,
} from "../../../store/slice/url.slice";
import { isDateExpired, ReformatDate } from "../../../utils";
import toast from "react-hot-toast";
import { ModalComponent } from "../../UI/modal";
import InfoUrl from "../info-url";

const RenderUrl = () => {
  const dispatch = useAppDispatch();
  const {
    allData: data,
    loading,
    fetchCheck,
  } = useAppSelector((state) => state.url);
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
  }>({
    current: 1,
    pageSize: 10,
  });
  const [modal, setModal] = useState<{
    delete: false | string;
    info: boolean;
  }>({
    delete: false,
    info: false,
  });
  const referenceDate = new Date();

  useEffect(() => {
    dispatch(
      getAllUrls({ page: pagination.current, pageSize: pagination.pageSize })
    );
  }, [pagination, fetchCheck]);

  const getInfoUrl = (shortUrl: string) => {
    dispatch(getShortUrlInfo(shortUrl));
    setModal({
      ...modal,
      info: true,
    });
  };

  const deleteUrl = () => {
    modal.delete
      ? dispatch(deleteShortUrl(modal.delete))
      : toast.error("alias не передан");

    setModal({
      ...modal,
      delete: false,
    });
  };

  const redirectUrl = (shortUrl: string, expiresAt: Date | null) => {
    if (isDateExpired(expiresAt, referenceDate)) {
      toast.error("Ссылка просрочена.");
      return;
    }

    window.open(`http://localhost:5000/api/url/redirect/${shortUrl}`, "_blank");
  };

  const columns: TableProps<IDataType>["columns"] = [
    {
      title: "url",
      dataIndex: "originalUrl",
      key: "originalUrl",
      align: "center",
    },
    {
      title: "alias",
      dataIndex: "shortUrl",
      key: "shortUrl",
      align: "center",
      width: "30%",
    },
    {
      title: "expiresAt",
      dataIndex: "expiresAt",
      key: "expiresAt",
      width: 100,
      align: "center",
      render: (item) => {
        return (
          <Tag color={isDateExpired(item, referenceDate) ? "red" : "green"}>
            {item ? ReformatDate(item) : "не указан"}
          </Tag>
        );
      },
    },
    {
      title: "Действия",
      key: "action",
      width: 200,
      align: "center",
      render: (item) => (
        <Space size="middle">
          <IconButtonComponent
            onClick={() => redirectUrl(item?.shortUrl, item?.expiresAt)}
          >
            <Tooltip title="Переадресация">
              <PlayCircleOutlined style={{ fontSize: "20px" }} />
            </Tooltip>
          </IconButtonComponent>
          <IconButtonComponent onClick={() => getInfoUrl(item?.shortUrl)}>
            <Tooltip title="Получение информации о ссылке">
              <EyeOutlined style={{ fontSize: "20px" }} />
            </Tooltip>
          </IconButtonComponent>
          <IconButtonComponent
            onClick={() =>
              setModal({
                ...modal,
                delete: item?.shortUrl,
              })
            }
          >
            <Tooltip title="Удаление">
              <DeleteOutlined style={{ fontSize: "20px" }} />
            </Tooltip>
          </IconButtonComponent>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <TableComponent
        loading={loading}
        columns={columns}
        data={data?.content}
        totalCount={data?.totalCount ? data?.totalCount : 0}
        pagination={pagination}
        setPagination={setPagination}
      />
      <ModalComponent
        active={modal.delete === false ? false : true}
        handleClose={() =>
          setModal({
            ...modal,
            delete: false,
          })
        }
        title="Внимание !"
        footer={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              danger={true}
              type="dashed"
              onClick={() =>
                setModal({
                  ...modal,
                  delete: false,
                })
              }
            >
              Отмена
            </Button>
            <Button danger={true} type="primary" onClick={() => deleteUrl()}>
              Удалить
            </Button>
          </div>
        }
        children={<h3>Вы подтверждаете удаление ?</h3>}
      />
      <InfoUrl
        active={modal.info}
        onClose={() =>
          setModal({
            ...modal,
            info: false,
          })
        }
        referenceDate={referenceDate}
      />
    </div>
  );
};

export default RenderUrl;
