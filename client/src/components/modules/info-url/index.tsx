import { Descriptions, DescriptionsProps, List, Tag } from "antd";
import { ModalComponent } from "../../UI/modal";
import { useAppSelector } from "../../../store/hooks";
import { isDateExpired, ReformatDate } from "../../../utils";

const InfoUrl = ({
  active,
  onClose,
  referenceDate,
}: {
  active: boolean;
  onClose: () => void;
  referenceDate: Date;
}) => {
  const data = useAppSelector((state) => state.url.infoData);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "id",
      children: <span>{data?.id}</span>,
    },
    {
      key: "2",
      label: "Короткий url",
      children: <span>{data?.shortUrl}</span>,
    },
    {
      key: "3",
      label: "Полный url",
      children: <span>{data?.originalUrl}</span>,
    },
    {
      key: "5",
      label: "Дата создания",
      children: <span>{data?.createdAt && ReformatDate(data?.createdAt)}</span>,
    },
    {
      key: "6",
      label: "Количество кликов",
      children: <span>{data?.clickCount}</span>,
    },
    {
      key: "7",
      label: "Срок работы",
      children: (
        <Tag
          color={
            data?.expiresAt && isDateExpired(data?.expiresAt, referenceDate)
              ? "red"
              : "green"
          }
        >
          {data?.expiresAt ? ReformatDate(data?.expiresAt) : "не указан"}
        </Tag>
      ),
    },
    {
      key: "ip",
      label: "Последние 5 ip",
      span: 3,
      children: (
        <List
          dataSource={data?.analytics}
          renderItem={(entry: any) => <List.Item>{entry.ipAddress}</List.Item>}
        />
      ),
    },

    // ...(data?.analytics?.map((entry) => ({
    //   key: entry.id.toString(),
    //   label: ReformatDate(entry.createdAt),
    //   children: <span>{entry.ipAddress}</span>,
    // })) || []),
  ];
  return (
    <ModalComponent
      active={active}
      handleClose={() => onClose()}
      handleOk={() => onClose()}
      title="Подробные данные"
      width="50%"
      children={
        <Descriptions
          items={items}
          bordered
          layout="horizontal"
          colon={false}
          column={1}
          size="middle"
        />
      }
    />
  );
};

export default InfoUrl;
