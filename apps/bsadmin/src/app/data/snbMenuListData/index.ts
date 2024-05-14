export const snbMenuListData = [
  // {
  //   menuLabel: "홈",
  //   menuIcon: "home",
  //   menuPath: {
  //     name: "/dashboard",
  //     nestedPath: [],
  //   },
  // },
  // {
  //   menuLabel: "고객상담",
  //   menuIcon: "",
  //   menuPath: {
  //     name: "",
  //     nestedPath: [
  //       {
  //         menuLabel: "상담관리",
  //         menuPath: "",
  //       },
  //     ],
  //   },
  // },
  // {
  //   menuLabel: '견적서',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '견적서 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '임시 보관함',
  //         menuPath: ''
  //       }
  //     ]
  //   },
  // },
  {
    menuLabel: "주문서",
    menuIcon: "sheet",
    menuPath: {
      name: "/orsh",
      nestedPath: [
        {
          menuLabel: "고객 주문서 관리",
          menuPath: "/orsh-list",
        },
        {
          menuLabel: "내부 주문서 관리",
          menuPath: "/orshbs-list",
        },
        {
          menuLabel: "견적서 관리",
          menuPath: "/orsh-qttn-list",
        },
      ],
    },
  },
  {
    menuLabel: "오더",
    menuIcon: "order",
    menuPath: {
      name: "/order",
      nestedPath: [
        {
          menuLabel: "오더 관리",
          menuPath: "/order-list",
        },
        {
          menuLabel: "오더 등록",
          menuPath: "/order-reg",
        },
        {
          menuLabel: "내부 오더 등록",
          menuPath: "/order-intn-reg",
        },
        {
          menuLabel: "외부 오더 등록",
          menuPath: "/order-extr-reg",
        },
      ],
    },
  },
  {
    menuLabel: "실험",
    menuIcon: "experiment",
    menuPath: {
      name: "/exp",
      nestedPath: [
        {
          menuLabel: "실험 정보",
          menuPath: "/exp-info-list",
        },
        {
          menuLabel: "RUN 리스트",
          menuPath: "/exp-run-list",
        },
        {
          menuLabel: "샘플 리스트",
          menuPath: "/exp-sample-list",
        },
      ],
    },
  },
  {
    menuLabel: "장부",
    menuIcon: "read",
    menuPath: {
      name: "/ledger",
      nestedPath: [
        {
          menuLabel: "거래처별 결제 현황",
          menuPath: "/ledger-cust-pay-list",
        },
        {
          menuLabel: "분석 내역서 관리",
          menuPath: "/ledger-analysis-report-list",
        },
        {
          menuLabel: "거래 명세서 관리",
          menuPath: "/ledger-ts-list",
        },
        {
          menuLabel: "세금 계산서 관리",
          menuPath: "/ledger-tax-invoice-list",
        },
        // {
        //   menuLabel: '매출 관리',
        //   menuPath: '/sales-cust-list'
        // }
      ],
    },
  },
  // {
  //   menuLabel: '영업활동',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '영업 일정',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '영업 활동',
  //         menuPath: ''
  //       }
  //     ]
  //   }
  // },
  {
    menuLabel: "고객",
    menuIcon: "customer",
    menuPath: {
      name: "/customer",
      nestedPath: [
        {
          menuLabel: "고객 관리",
          menuPath: "/cust-list",
        },
        {
          menuLabel: "거래처(PI) 관리",
          menuPath: "/agnc-pi-list",
        },
        {
          menuLabel: "기관 정보 관리",
          menuPath: "/inst-info-list",
        },
      ],
    },
  },
  {
    menuLabel: "관리",
    menuIcon: "manage",
    menuPath: {
      name: "/set",
      nestedPath: [
        {
          menuLabel: "마스터 코드 관리",
          menuPath: "/master-code-list",
        },
        {
          menuLabel: "서비스 타입 관리",
          menuPath: "/svc-type-list",
        },
        {
          menuLabel: "서비스 분류 관리",
          menuPath: "/svc-cate-list",
        },
        {
          menuLabel: "장비 Kit 분류 관리",
          menuPath: "/machine-kit-list",
        },
        {
          menuLabel: "담당자 관리",
          menuPath: "/contact-list",
        },
        {
          menuLabel: "견적 품명 관리",
          menuPath: "/es-pr-list",
        },
        {
          menuLabel: "과제 관리",
          menuPath: "/project-list",
        },
        {
          menuLabel: "서비스 기준가 관리",
          menuPath: "/svc-std-price-list",
        },
      ],
    },
  },
  {
    menuLabel: "재고",
    menuIcon: "stock",
    menuPath: {
      name: "/stock",
      nestedPath: [
        {
          menuLabel: "재고 관리",
          menuPath: "/stock-mngmnt-list",
        },
        {
          menuLabel: "입출고부",
          menuPath: "/stock-inout-mngmnt-list",
        },
        {
          menuLabel: "수불부",
          menuPath: "/stock-mtld-mngmnt-list",
        },
        {
          menuLabel: "아웃소싱 관리",
          menuPath: "/stock-ots-mngmnt-list",
        },
        {
          menuLabel: "주문처 관리",
          menuPath: "/stock-agnc-mngmnt-list",
        },
        {
          menuLabel: "병원 거래처 관리",
          menuPath: "/stock-hspt-mngmnt-list",
        },
      ],
    },
  },
];
