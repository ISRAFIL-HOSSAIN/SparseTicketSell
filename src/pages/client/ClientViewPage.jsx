import React from 'react';
import { GridComponent, ColumnsDirective,Search,
  ColumnDirective, Page, Toolbar, Edit, Inject, Filter, Sort, Group } from '@syncfusion/ej2-react-grids';
import { clientsData, clientsGrid } from '../../data/dummy';
import { Header } from '../../components';

const ClientViewPage = () => {
  const toolbarOptions = ['Add','Edit','Delete','Update','Cancel','Search'];
  const editing = { allowDeleting: true, allowEditing: true,allowAdding:true,mode:'Normal'};

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Clients" />
      <GridComponent
        dataSource={clientsData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {clientsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar,Search,Edit,Sort,Filter]} />

      </GridComponent>
    </div>
  );
};
export default ClientViewPage;