'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter, usePathname } from 'next/navigation';
import { SxProps } from '@mui/material';
import CJBSLogo from '../../atoms/CJBSLogo';
import { _Link } from 'cjbsDSTM/atoms/Link';
import { DASHBOARD_URL } from 'src/const/common';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MenuProps {
  data: MenuData[];
  centered?: boolean;
  sx?: SxProps;
  fontColor?: string;
  onLogo?: boolean;
  type: 'SUB' | 'MAIN';
}

interface MenuData {
  name: string;
  url: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MenuTabs({
  data,
  centered,
  sx,
  fontColor,
  onLogo,
  type,
}: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    let value = 0;
    if (type === 'SUB') {
      data.map((item, index) => {
        if (pathname.indexOf(item.url) > -1) {
          console.log('item.url > ', item.url);

          value = index;
        }
      });
      setValue(value);
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: type === 'SUB' ? 'center' : 'flex-start',
        alignItems: 'center',
        paddingLeft: '24px',
        ...sx,
      }}
    >
      {onLogo && (
        <_Link href={DASHBOARD_URL}>
          <CJBSLogo />
        </_Link>
      )}
      <Tabs
        centered={centered}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs"
      >
        {data.map((menu, index) => (
          <Tab
            onClick={() => router.push(menu.url)}
            sx={{
              marginRight: '25px',
              marginLeft: type === 'SUB' ? '25px' : '192px',
            }}
            key={index}
            label={
              <Typography color={fontColor} variant="subtitle2">
                {menu.name}
              </Typography>
            }
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </Box>
  );
}
