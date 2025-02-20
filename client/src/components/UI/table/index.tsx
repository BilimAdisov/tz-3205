import { Table } from "antd";
import { memo } from "react";

export interface TableProps {
  nonBorder?: true;
  setPagination?: any;
  onClickCard?: (e: any) => void;
  totalCount: number;
  style?: any;
  size?: "small" | "middle" | "large";
  scroll?: any;
  columns: any;
  data: any;
  loading?: boolean | undefined;
  pagination?:
    | {
        current: number;
        pageSize: number;
      }
    | false;
  isQuarter?: true;
}

export const TableComponent = memo(
  ({
    data,
    columns,
    loading,
    pagination,
    setPagination,
    totalCount,
    style,
    size,
    scroll,
    nonBorder,
    isQuarter,
  }: TableProps) => {
    function onChange(page: number, pageSize: number) {
      setPagination({
        current: page,
        pageSize,
      });
    }
    return (
      <Table
        bordered={nonBorder ? false : true}
        columns={columns}
        dataSource={data}
        size={size ? size : "large"}
        indentSize={100}
        loading={loading}
        pagination={
          totalCount >= 11
            ? pagination && {
                pageSizeOptions: isQuarter
                  ? totalCount >= 60
                    ? ["12", "24", "36", "48", "60"]
                    : totalCount >= 48
                    ? ["12", "24", "36", "48"]
                    : totalCount >= 36
                    ? ["12", "24", "36"]
                    : totalCount >= 24
                    ? ["12", "24"]
                    : []
                  : totalCount >= 50
                  ? ["10", "20", "30", "40", "50"]
                  : totalCount >= 40
                  ? ["10", "20", "30", "40"]
                  : totalCount >= 30
                  ? ["10", "20", "30"]
                  : totalCount >= 20
                  ? ["10", "20"]
                  : [],

                defaultPageSize: 10,
                showSizeChanger: false,
                position: ["bottomRight"],
                current: pagination.current,
                pageSize: pagination.pageSize,
                onChange: onChange,
                total: totalCount,
              }
            : false
        }
        style={style}
        scroll={scroll}
      />
    );
  }
);

TableComponent.displayName = "HardTable";
