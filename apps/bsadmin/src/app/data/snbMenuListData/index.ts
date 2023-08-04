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
  // {
  //   menuLabel: '주문서',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '주문서 관리',
  //         menuPath: ''
  //       }
  //     ]
  //   },
  // },
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
      ],
    },
  },

  // {
  //   menuLabel: '실험',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '실험 일정',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '오더 현황 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: 'All Runs',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: 'All 샘플s',
  //         menuPath: ''
  //       }
  //     ]
  //   }
  // },
  // {
  //   menuLabel: '장부',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '고객별 결제 현황',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '분석 내역서 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '세금 계산서 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '거래 명세서 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '매출 관리',
  //         menuPath: ''
  //       }
  //     ]
  //   }
  // },
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
      name: "/cust",
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
          menuLabel: "과제 관리",
          menuPath: "/project-list",
        },

        {
          menuLabel: "서비스 기준가 관리",
          menuPath: "/svc-std-price-list",
        },

        {
          menuLabel: "견적 품명 관리",
          menuPath: "/es-pr-list",
        },
      ],
    },
  },

  // {
  //   menuLabel: '기준가',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '서비스 기준가 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '서비스 타입 관리',
  //         menuPath: ''
  //       }
  //     ]
  //   }
  // },
  // {
  //   menuLabel: '담당자',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '담당자 관리',
  //         menuPath: ''
  //       },
  //     ]
  //   }
  // },
  // {
  //   menuLabel: '관리',
  //   menuIcon: '',
  //   menuPath: {
  //     name: '',
  //     nestedPath: [
  //       {
  //         menuLabel: '마스터코드 관리',
  //         menuPath: ''
  //       },
  //       {
  //         menuLabel: '프로젝트 관리',
  //         menuPath: ''
  //       },
  //     ]
  //   }
  // },
];
