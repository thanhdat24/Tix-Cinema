import React, { Fragment, useState } from "react";
import { Tabs, Radio, Space } from "antd";
const { TabPane } = Tabs;
export default function HomeMenu(props) {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const { tabPosition } = state;
  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };
  return (
    <Fragment>
      <Tabs tabPosition={tabPosition}>
        <TabPane
          tab={
            <img
              src="https://picsum.photos/50"
              alt="1"
              className="rounded-full"
            />
          }
          key="1"
        >
          Content of Tab 1
        </TabPane>
        <TabPane
          tab={
            <img
              src="https://picsum.photos/50"
              alt="1"
              className="rounded-full"
            />
          }
          key="2"
        >
          Content of Tab 2
        </TabPane>
        <TabPane
          tab={
            <img
              src="https://picsum.photos/50"
              alt="1"
              className="rounded-full"
            />
          }
          key="3"
        >
          Content of Tab 3
        </TabPane>
      </Tabs>
    </Fragment>
  );
}
