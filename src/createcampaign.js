import React, { Component, Fragment } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import lodash from "lodash"; // library added for debounce functionality
import moment from "moment";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "./CreateCampaign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup } from "reactstrap";
import DatePicker from "react-datepicker";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import MappleToolTip from "reactjs-mappletooltip";
// services
import CampaignService from "../../services/CampaignService";
import "rc-time-picker/assets/index.css";
import ModalService from "../../services/ModalService";
import { changeSMSContent } from "../../utils/utils";
import { TextAreaHighlight } from "../../utils/TextAreaHighlight";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import Storage from "../../services/Storage";
import swal from "sweetalert";
import Sidebar from "react-sidebar";
import * as Scroll from "react-scroll";
import { messages } from "../../constants/constant.message";
import Validation from "../../services/Validation";
import OutsideClickHandler from "react-outside-click-handler";
// import PromotionalEventsUsers from "../PromotionalEventsUsers/PromotionalEventsUsers";
import WhatsappEventsUsers from "../WhatsappEventsUsers/WhatsappEventsUsers";
import ManualDataPmFilter from "../ManualDataPmFilter/ManualDataPmFilter";
// import CampaignSecondaryUserFilter from "../CampaignSecondaryUserFilter/CampaignSecondaryUserFilter";
import CampaignFilter from "../CampaignFilter/CampaignFilter";
import CampaignHoUserFilter from "../CampaignHoUserFilter/CampaignHoUserFilter";
import CustomTimePicker from "../CustomTimePicker/CustomTimePicker";
import GoogleAnalticsService from "../../services/GoogleAnalticsService";
import DashboardService from "../../services/DashboardService";
import NotificationService from '../../services/NotificationService';
import { Permissions } from "../../constants/constant.permissions";
import { Roles } from "../../constants/constant.role";
const { ERROR_MESSAGE } = messages.COMMON;
// import Moment from "react-moment";
var routUrl = null;
class CreateCampaign extends Component {
  TagsWithoutOffer = ["#StoreName", '#PhoneNumber', "#CustomerName"];

  constructor(props) {
    super(props);
    this.state = {
      actionOption: [],
      Show_entermsgcontent: false,
      selectedAction: null,
      isActionValid: true,
      msg_detail: false,
      userDetail: Storage.getUserDetail(),
      purpose: [],
      service: [],
      festivalTabClicked: false,
      festival: [],
      cc_self: false,
      time: null,
      total_customer: "",
      template_id: "",
      selectServiceClicked: false,
      total_custom_customer_count: null,
      smsConfig: {
        isNotValidMinCount: false,
        length: 0,
        smsContentCredit: 0,
      },
      maxCount: 459,
      tags: [],
      selectedTags: [],
      highLightTag: [],
      senderIds: [],
      isLoading: false,
      tooltipText: "",
      obj: {},
      controls: {
        action: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        sender_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        campaign_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        pm_trackwalkins_template_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        is_scheduled: {
          value: false,
          valid: null,
          touched: false,
          nullValue: null,
        },
        purpose_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        campaign_name: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        customer_target_type: {
          value: "all",
          valid: null,
          touched: false,
          nullValue: null,
        },
        message_type: {
          value: "simple",
          valid: null,
          touched: false,
          nullValue: null,
        },
        communication_type: {
          value: "sms",
          valid: null,
          touched: false,
          nullValue: null,
        },
        notification_title: {
          value: "",
          valid: null,
          touched: false,
          nullValue: null,
        },
        language: {
          value: "english",
          valid: null,
          touched: false,
          nullValue: null,
        },
        sms_draft: {
          value: "",
          valid: null,
          touched: false,
          nullValue: null,
        },
        image_url: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        started_at: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        campaign_notification_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        service_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        festival_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_type: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        group_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        from_date: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        to_date: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_occasion: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_occasion_date_from: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_occasion_date_to: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_vehicle_type_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_vehicle_type_brand_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_vehicle_type_brand_model_id: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        source_of_member: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_manual_customer: {
          value: [],
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_filter_source: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        purpose_name: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        is_picture_sms: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        custom_customer: {
          value: {},
          valid: null,
          touched: false,
          nullValue: null,
        },
        sms_credit_used: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
        customerIds: {
          value: null,
          valid: null,
          touched: false,
          nullValue: null,
        },
      },
      isPreviewImageLightBoxOpen: false,
      imagesToPreview: [],
      imageUrlFromsms_draft: null,
      openManualDataFilter: false,
      showTime: false,
      isFormValid: false,
      errorTime: false,
      isHoLogin: false,
      jkUserFilterData: {},
      jkSecondaryUserFilterData: {},
      jkPromotionalEventsUsersData: {},
      tooltipOpen: false,
      tooltip_name: "create-campaign",
      view_sender_id: false,
      applyFilterCIPUserFilter: {},
      whatsAppFilterData: {},
      filterType: null,
    };
    this.getservice();
    this.getpurpose();
    this.getFestival();
    this.getAllCustomerData();
    this.getCustomiseCustomerData();
    if (
      this.state.userDetail.type &&
      (this.state.userDetail.type === Roles.HEAD_OFFICE_ROLE ||
        this.state.userDetail.type === Roles.PROJECT_MANAGER_ROLE)
    ) {
      this.TagsWithoutOffer = ["#CustomerName"];
      this.state.isHoLogin = true;
    }
    if (this.state.userDetail.permissions && this.state.userDetail.permissions.includes(Permissions.VIEW_SENDER_ID)) {
      this.state.view_sender_id = true
    }
  }

  componentDidMount() {
    this.getHelpModuleScreen();
    this.getNotificationActions({ roles: ['all'] });
    GoogleAnalticsService.pageView("Create Campaign View");
    //when you come to edit or duplicate the campaign then all data of campaign detail come here to show that
    //Here we set all data

    let { controls } = this.state;
    this.setData();
    if (this.props.CampaignDetailData.manageGroup) {
      //when you come from manage group
      controls["customer_target_type"].value = "custom";
      this.onClickCustomise();
    }
    if (this.props.CampaignDetailData && this.props.CampaignDetailData.template_id) {
      this.setState({ template_id: this.props.CampaignDetailData.template_id })
    }
    routUrl =
      window.location.href &&
      window.location.href.split("/")[5] &&
      window.location.href.split("/")[5];
    if (routUrl === "schedule") {
      controls["is_scheduled"].value = true;
      this.setState({ controls });
    }

    this.setState({
      controls,
    });
  }

  getNotificationActions = (reqBody) => {
    let isActionValid = true;
    NotificationService.getNotificationActions(reqBody)
      .then(data => {
        const { data: actions } = data.data;
        let actionOption = [];
        let selectedAction = null;

        if (actions && actions.length > 0) {
          for (let i = 0; i < actions.length; i++) {
            let obj = {
              value: actions[i].action,
              label: actions[i].title
            }
            actionOption.push(obj);
          }
          selectedAction = actionOption[0];
          isActionValid = true;
        } else {
          isActionValid = false;
        }
        this.setState({ selectedAction, actionOption, isActionValid });
      })
      .catch(e => {

      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.helpGuide !== this.props.helpGuide &&
      !!this.props.helpGuide === true &&
      this.props.helpGuide === "purpose_id"
    ) {
      this.setState({
        tooltip_name: "purpose_id",
        tooltipOpen: true,
      });
    }
  }

  componentWillReceiveProps(props) {
    let redirectData = this.props.redirectDetails;
    if (!redirectData) {
      this.setRedirectData();
    }
  }

  getHelpModuleScreen = () => {
    this.setState({ isLoading: true });
    DashboardService.getHelpModuleScreen()
      .then((data) => {
        this.setState({ isLoading: false });
        const { screen_name } = data.data.data;
        if (screen_name.includes("create_campaign") === false) {
          this.setState({ tooltipOpen: true, tooltip_name: "purpose_id" });
        }
      })
      .catch((e) => {
        this.setState({ isLoading: false });
      });
  };

  reOpenToolTipPopOver = (name) => {
    this.setState({
      tooltipOpen: true,
      tooltip_name: name,
    });
  };

  addHelpModuleScreen = (name) => {
    this.setState({ isLoading: true });
    this.setState({
      dropdownOpenYtd: true,
    });
    DashboardService.addHelpModuleScreen({ screen_name: name })
      .then((data) => {
        this.setState({ tooltipOpen: false, tooltip_name: "" });
        this.setState({ isLoading: false });
        this.setState({
          dropdownOpenYtd: true,
        });
      })
      .catch((e) => {
        this.setState({ isLoading: false });
      });
  };

  resteCount = () => {
    this.setState({
      total_custom_customer_count: this.props.CampaignDetailData
        .customers_count,
    });
  };

  setData = () => {
    let {
      controls,
      smsConfig,
      jkUserFilterData,
      jkSecondaryUserFilterData,
      jkPromotionalEventsUsersData,
      applyFilterCIPUserFilter,
      whatsAppFilterData
    } = this.state;
    this.setState({
      isLoading: true,
    });

    if (
      this.props.CampaignDetailData &&
      !this.props.openCreateCampaignPageNew
    ) {
      if (this.props.CampaignDetailData.filter) {
        jkUserFilterData = this.props.CampaignDetailData.filter;
        jkSecondaryUserFilterData = this.props.CampaignDetailData.filter;
        jkPromotionalEventsUsersData = this.props.CampaignDetailData.filter;
        applyFilterCIPUserFilter = this.props.CampaignDetailData.filter;
        whatsAppFilterData = this.props.CampaignDetailData.filter;

        if (this.props.CampaignDetailData.filter && this.props.CampaignDetailData.filter.filter_target_ids) {
          this.getNotificationActions({ roles: this.props.CampaignDetailData.filter.filter_target_ids });
        }

      }
      this.setState({
        cc_self: this.props.CampaignDetailData.cc_self,
      });
      if (this.props.CampaignDetailData.selectedCustomers) {
        controls[
          "customerIds"
        ].value = this.props.CampaignDetailData.selectedCustomers;
      }
      controls["language"].value = this.props.CampaignDetailData.language
        ? this.props.CampaignDetailData.language
        : "english";
      controls["image_url"].value = this.props.CampaignDetailData.image_url;
      controls["from_date"].value = this.props.CampaignDetailData.from_date;
      controls["to_date"].value = this.props.CampaignDetailData.to_date;
      controls["sms_draft"].value = this.props.CampaignDetailData.sms_draft;
      controls["action"].value = this.props.CampaignDetailData.action;
      this.replaceWords(controls["sms_draft"].value);
      controls["started_at"].value = this.props.CampaignDetailData.started_at
        ? new Date(this.props.CampaignDetailData.started_at)
        : null;
      controls["purpose_id"].value = this.props.CampaignDetailData.purpose_id;

      controls["service_id"].value = this.props.CampaignDetailData.service_id;
      if (
        this.props.CampaignDetailData.service_id &&
        this.props.CampaignDetailData.campaign_id
      ) {
        if (
          this.props.CampaignDetailData.filter_type === undefined ||
          (this.props.CampaignDetailData.filter_type &&
            this.props.CampaignDetailData.filter_type !== "last_visit_purpose")
        ) {
          this.setState({
            selectServiceClicked: true,
          });
        }
      }
      controls["campaign_id"].value = this.props.CampaignDetailData.campaign_id;
      controls["festival_id"].value = this.props.CampaignDetailData.festival_id;
      if (this.props.CampaignDetailData.festival_id) {
        this.setState({
          festivalTabClicked: true,
        });
      }
      controls[
        "source_of_member"
      ].value = this.props.CampaignDetailData.source_of_member;
      controls["message_type"].value = this.props.CampaignDetailData
        .message_type
        ? this.props.CampaignDetailData.message_type
        : "simple";
      controls[
        "is_scheduled"
      ].value = this.props.CampaignDetailData.is_scheduled;
      controls[
        "purpose_name"
      ].value = this.props.CampaignDetailData.purpose_name;
      controls[
        "campaign_name"
      ].value = this.props.CampaignDetailData.campaign_name;
      controls[
        "is_picture_sms"
      ].value = this.props.CampaignDetailData.is_picture_sms;

      controls[
        "sms_credit_used"
      ].value = this.props.CampaignDetailData.sms_credit_used;
      // controls[
      //   "custom_filter_type"
      // ].value = this.props.CampaignDetailData.custom_filter_type;
      // controls[
      //   "custom_filter_source"
      // ].value = this.props.CampaignDetailData.custom_filter_source;

      controls[
        "customer_target_type"
      ].value = this.props.CampaignDetailData.customer_target_type;
      // controls["group_id"].value = this.props.CampaignDetailData.group_id;

      // controls[
      //   "custom_filter_vehicle_type_id"
      // ].value = this.props.CampaignDetailData.custom_filter_vehicle_type_id;
      // controls[
      //   "custom_filter_vehicle_type_brand_id"
      // ].value = this.props.CampaignDetailData.custom_filter_vehicle_type_brand_id;
      // controls[
      //   "custom_filter_vehicle_type_brand_model_id"
      // ].value = this.props.CampaignDetailData.custom_filter_vehicle_type_brand_model_id;
      // controls[
      //   "custom_filter_occasion"
      // ].value = this.props.CampaignDetailData.custom_filter_occasion;

      // controls[
      //   "custom_filter_occasion_date_from"
      // ].value = this.props.CampaignDetailData.custom_filter_occasion_date_from;
      // controls[
      //   "custom_filter_occasion_date_to"
      // ].value = this.props.CampaignDetailData.custom_filter_occasion_date_to;
      // controls["custom_filter_manual_customer"].value = this.props
      //   .CampaignDetailData.custom_filter_manual_customer
      //   ? this.props.CampaignDetailData.custom_filter_manual_customer
      //   : [];

      controls["notification_title"].value = this.props.CampaignDetailData
        .notification_title
        ? this.props.CampaignDetailData.notification_title
        : "";
      controls["communication_type"].value = this.props.CampaignDetailData
        .communication_type
        ? this.props.CampaignDetailData.communication_type
        : "sms";

      if (this.props.CampaignDetailData.customer_target_type !== "all") {
        this.setState({
          total_custom_customer_count: this.props.CampaignDetailData
            .customers_count,
        });
      } else {
        this.setState({
          total_custom_customer_count: null,
        });
      }

      let filterType = this.props.CampaignDetailData.customer_target_type === 'jk_cip_user' ? 'cip_user' :
        this.props.CampaignDetailData.customer_target_type === 'jk_secondary_point' ? 'warranty_users' :
          this.props.CampaignDetailData.customer_target_type === 'jk_promotion_and_services' ? 'promotional' : 'warranty_users';

      this.setState(
        {
          filterType: filterType,
          controls,
          time: this.props.CampaignDetailData.started_at,
          jkUserFilterData,
          jkSecondaryUserFilterData,
          jkPromotionalEventsUsersData,
          applyFilterCIPUserFilter,
          whatsAppFilterData,
          isLoading: false,
        },
        () => {
          if (
            this.props.CampaignDetailData.customer_target_type !== "all" &&
            this.props.CampaignDetailData.custom_filter_type !== "manual"
          ) {
            if (
              this.props.CampaignDetailData.isDuplicate ||
              this.props.CampaignDetailData.isEdit
            ) {
              if (this.state.isHoLogin) {
                this.addgetCustomCustomerHo();
              } else {
                this.addgetCustomCustomer();
              }
            }
          }
        }
      );

      if (this.props.CampaignDetailData.sms_draft) {
        controls[
          "custom_filter_manual_customer"
        ].value = this.props.CampaignDetailData.custom_filter_manual_customer;
        this.onChangeSMSContent({
          target: { value: controls["sms_draft"].value },
        });
      }
    } else {
      let total_custom_customer_count = "";
      controls["language"].value = "english";
      smsConfig["smsContentCredit"] = 0;
      smsConfig["length"] = 0;
      controls["image_url"].value = "";
      controls["sms_draft"].value = "";
      controls["started_at"].value = null;
      controls["purpose_id"].value = "";
      controls["service_id"].value = "";
      controls["campaign_id"].value = null;
      controls["festival_id"].value = "";
      controls["source_of_member"].value = "";
      controls["message_type"].value = "simple";
      controls["is_scheduled"].value = false;
      controls["purpose_name"].value = "";
      controls["campaign_name"].value = "";
      controls["is_picture_sms"].value = "";
      controls["group_id"].value = "";
      controls["sms_credit_used"].value = "";
      controls["custom_filter_type"].value = "";
      controls["custom_filter_source"].value = "";
      controls["custom_filter_manual_customer"].value = "";
      controls["notification_title"].value = "";
      controls["communication_type"].value = "sms";
      controls["notification_title"].showErrorMsg = false;
      if (this.props.CampaignDetailData.customer_target_type) {
        controls[
          "customer_target_type"
        ].value = this.props.CampaignDetailData.customer_target_type;
      }
      if (
        this.props.CampaignDetailData.customers_count &&
        controls["customer_target_type"].value !== "all"
      ) {
        total_custom_customer_count = this.props.CampaignDetailData
          .customers_count;
      }
      // if (!this.props.CampaignDetailData.manageGroup) {
      //   controls["customer_target_type"].value = "all";
      // }
      if (
        this.state.userDetail &&
        this.state.userDetail.type &&
        (this.state.userDetail.type === Roles.HEAD_OFFICE_ROLE ||
          this.state.userDetail.type === Roles.PROJECT_MANAGER_ROLE)
      ) {
        controls["customer_target_type"].value = "";
      }

      this.setState({
        controls,
        total_custom_customer_count: total_custom_customer_count
          ? total_custom_customer_count
          : "",
        time: "",
        errorTime: false,
        smsConfig,
        jkUserFilterData: {},
        whatsAppFilterData: {},
        jkSecondaryUserFilterData: {},
        jkPromotionalEventsUsersData: {},
        applyFilterCIPUserFilter: {},
        isLoading: false,
        selectServiceClicked: false,
        festivalTabClicked: false,
      });
      this.replaceWords("");
    }
  };

  handleChangecc_self = (e) => {
    this.setState({ cc_self: !this.state.cc_self });
  };

  addgetCustomCustomerHo = () => {
    let reqData = this.props.CampaignDetailData.filter;

    if (this.props.CampaignDetailData.customer_target_type === "whatsapp") {
      this.setState({
        total_custom_customer_count: this.props.CampaignDetailData.filter
          .counts,
        whatsAppFilterData: {
          ids: this.props.CampaignDetailData.filter.ids,
          counts: this.props.CampaignDetailData.filter.counts,
        },
        isLoading: false,
      });
    } else {
      reqData.customer_target_type = this.props.CampaignDetailData.customer_target_type;
      reqData.communication_type = this.state.controls.communication_type.value
        ? this.state.controls.communication_type.value
        : "sms";
      this.setState({ isLoading: true });
      CampaignService.getCustomerCount(reqData)
        .then((data) => {
          this.setState({
            total_custom_customer_count: data.data.data.count,
            isLoading: false,
          });
          if (data.data.data.count === 0) {
            ModalService.openAlert(
              "",
              "There is no user found with applied filter . Please change filter criteria",
              "error"
            );
            return;
          }
        })
        .catch((e) => {
          this.setState({ isLoading: false });

          let err =
            e.response &&
              e.response.data &&
              e.response.data.error &&
              e.response.data.error[0]
              ? e.response.data.error[0]
              : null;
          const message = err && err.message ? err.message : ERROR_MESSAGE;
          ModalService.openAlert("", message, "error");
        });
    }
  };

  handleValidation = (isSubmit = false) => {
    let { controls, isFormValid } = this.state;
    let {
      purpose_id,
      // campaign_name,
      sms_draft,
      image_url,
      message_type,
      started_at,
      is_scheduled,
    } = controls;
    let scroll_id = "";
    if (
      image_url.touched === true ||
      (isSubmit && message_type.value !== "simple")
    ) {
      image_url = Validation.notNullValidator(image_url);
      image_url.valid = !image_url.nullValue;
      if (image_url.valid === false) {
        image_url.showErrorMsg = true;
        scroll_id = "image_url";
      } else {
        image_url.showErrorMsg = false;
      }
    }

    if (
      (started_at.touched === true || isSubmit) &&
      is_scheduled.value === true
    ) {
      started_at = Validation.notNullValidator(started_at);
      started_at.valid = !started_at.nullValue;
      if (started_at.valid === false) {
        started_at.showErrorMsg = true;
      } else {
        started_at.showErrorMsg = false;
      }
    } else {
      started_at.valid = true;
    }

    if ((purpose_id.touched === true || isSubmit) && !this.state.isHoLogin) {
      purpose_id = Validation.notNullValidator(purpose_id);
      purpose_id.valid = !purpose_id.nullValue;
      if (purpose_id.valid === false) {
        purpose_id.showErrorMsg = true;
        if (!scroll_id) {
          scroll_id = "purpose_id";
        }
      } else {
        purpose_id.showErrorMsg = false;
      }
    } else {
      purpose_id.valid = true;
    }

    // if (campaign_name.touched === true || isSubmit) {
    //   campaign_name = Validation.notNullValidator(campaign_name);
    //   campaign_name.valid = !campaign_name.nullValue;
    //   if (campaign_name.valid === false) {
    //     campaign_name.showErrorMsg = true;
    //     if (!scroll_id) {
    //       scroll_id = "campaign_name";
    //     }
    //   } else {
    //     campaign_name.showErrorMsg = false;
    //   }
    // }

    if (sms_draft.touched === true || isSubmit) {
      sms_draft = Validation.notNullValidator(sms_draft);
      sms_draft.valid = !sms_draft.nullValue;
      if (sms_draft.valid === false) {
        sms_draft.showErrorMsg = true;
        if (!scroll_id) {
          scroll_id = "sms_draft";
        }
      } else {
        sms_draft.showErrorMsg = false;
      }
    }

    if (
      purpose_id.valid === true &&
      sms_draft.valid === true &&
      started_at.valid === true
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    this.setState({
      controls,
      isFormValid,
    });
    if (scroll_id) {
      this.scrollTo(scroll_id);
    }
    return isFormValid;
  };

  openFilterFromSelectPurpose = async () => {
    await this.setState({
      isLoading: true,
    });
    this.props.resetFilter(null);
    setTimeout(() => {
      this.setState(
        {
          isLoading: false,
        },
        () => {
          this.props.openFilterFromSelectPurpose();
        }
      );
    }, 3000);
  };

  handleTemplateIdChange = (event) => {
    this.setState({ template_id: event.target.value }, () => {
    })
  }

  handleChangeInput = async (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    const { controls, smsConfig, purpose } = this.state;
    if (controlName === 'action') {
      const { action } = controls;
      action.value = controlValue;
      this.setState({ controls }, () => {
      })
    }

    if (
      controlName === "purpose_id" &&
      controls.purpose_id.value &&
      this.props.is_first_time_reset_filter_from_customer_list
    ) {
      // if (this.props.CampaignDetailData &&
      //   (this.props.CampaignDetailData.purpose_type !== "tyre_purchase" &&
      //     this.props.CampaignDetailData.purpose_type !== "service" &&
      //     this.props.CampaignDetailData.purpose_type !== "birthday_wish" &&
      //     this.props.CampaignDetailData.purpose_type !== "anniversary_wish")) {

      // let oldFilter = purpose.filter(
      //   (p) => p.purpose_id === controls.purpose_id.value
      // );
      let newFilter = purpose.filter((p) => p.purpose_id === controlValue);
      let templateId = newFilter.template_id;
      this.setState({ template_id: templateId })
      if (
        this.state.total_custom_customer_count &&
        this.state.total_custom_customer_count > 0 &&
        (newFilter[0].type === "birthday_wish" ||
          newFilter[0].type === "anniversary_wish" ||
          newFilter[0].type === "tyre_purchase_due" ||
          newFilter[0].type === "service_due" ||
          (newFilter[0].filter_data &&
            Object.keys(newFilter[0].filter_data).length > 0))
      ) {
        // if (
        //   (this.props.CampaignDetailData.purpose_type === "tyre_purchase" &&
        //     newFilter[0].type !== 'tyre_purchase_due') &&
        //   (this.props.CampaignDetailData.purpose_type === "service" &&
        //     newFilter[0].type !== 'service_due') &&
        //   (this.props.CampaignDetailData.purpose_type === "anniversary_wish" &&
        //     newFilter[0].type !== 'anniversary_wish') &&
        //   (this.props.CampaignDetailData.purpose_type === "birthday_wish" &&
        //     newFilter[0].type !== 'birthday_wish')
        // ) {
        //   let eventData = Object.assign({}, e);
        //   if (!await this.props.confirmLostFilter()) {
        //     return false;
        //   }
        //   e = eventData;
        // }

        let formData = this.props.CampaignDetailData;
        formData.campaign_name = newFilter[0].campaign_name;
        formData.custom_filter_purpose_type = formData.purpose_type
          ? formData.purpose_type
          : null;
        if (
          formData.campaign_name &&
          formData.campaign_name.toLowerCase() === "tyre purchase due"
        ) {
          if (
            (formData.custom_filter_type &&
              (formData.custom_filter_type !== "all_due" ||
                formData.custom_filter_type !== "due" ||
                formData.custom_filter_purpose_type !== "tyre_purchase")) ||
            formData.custom_filter_type === undefined ||
            formData.custom_filter_type === null ||
            formData.custom_filter_type === ""
          ) {
            let eventData = Object.assign({}, e);
            if (!(await this.props.confirmLostFilter())) {
              return false;
            }
            e = eventData;
          }
        } else if (
          formData.campaign_name &&
          formData.campaign_name.toLowerCase() === "service due campaign"
        ) {
          if (
            (formData.custom_filter_type &&
              (formData.custom_filter_type !== "all_due" ||
                formData.custom_filter_type !== "due")) ||
            formData.custom_filter_purpose_type !== "service" ||
            formData.custom_filter_type === undefined ||
            formData.custom_filter_type === null ||
            formData.custom_filter_type === ""
          ) {
            let eventData = Object.assign({}, e);
            if (!(await this.props.confirmLostFilter())) {
              return false;
            }
            e = eventData;
          }
        } else if (
          formData.campaign_name &&
          (formData.campaign_name.toLowerCase() === "anniversary campaign" ||
            formData.campaign_name.toLowerCase() === "birthday campaign")
        ) {
          if (
            (formData.custom_filter_type &&
              formData.custom_filter_type !== "occasion") ||
            formData.custom_filter_type === undefined ||
            formData.custom_filter_type === null ||
            formData.custom_filter_type === ""
          ) {
            let eventData = Object.assign({}, e);
            if (!(await this.props.confirmLostFilter())) {
              return false;
            }
            e = eventData;
          }
        } else if (
          newFilter[0].filter_data &&
          Object.keys(newFilter[0].filter_data).length > 0
        ) {
          let eventData = Object.assign({}, e);
          if (!(await this.props.confirmLostFilter())) {
            return false;
          }
          e = eventData;
        }
      }
      //}
    }
    if (controlName === "campaign_name") {
      controls["campaign_name"].showErrorMsg = false;
    }

    if (controlName === "is_scheduled") {
      GoogleAnalticsService.event('Campaign', 'Scheduled This Campaign Click');
      controls["is_scheduled"].value = !JSON.parse(controlValue);
      this.setState({
        errorTime: false,
      });
    }
    else {
      controls[controlName].value = controlValue;
    }

    controls[controlName].touched = true;

    if (e.target.options && e.target.options.selectedIndex) {
      const selectedIndex = e.target.options.selectedIndex;
      this.onChangeSMSContent({
        target: { value: e.target.options[selectedIndex].getAttribute("msg") },
      });
    }

    if (!controls["is_scheduled"].value) {
      controls["started_at"].value = "";
      this.setState({
        time: "",
      });
    }

    if (controls.notification_title.value) {
      controls["notification_title"].showErrorMsg = false;
    }

    if (controlValue === "simple") {
      controls["image_url"].value = "";
      controls["image_url"].touched = false;
      controls["image_url"].showErrorMsg = false;
    }

    if (controlValue === "all") {
      controls["group_id"].value = "";
      controls["custom_filter_vehicle_type_brand_id"].value = "";
      controls["custom_filter_vehicle_type_brand_model_id"].value = "";
      controls["custom_filter_vehicle_type_id"].value = "";
      controls["custom_filter_occasion"].value = "";
      controls["custom_filter_occasion_date_from"].value = "";
      controls["custom_filter_occasion_date_to"].value = "";
      controls["from_date"].value = "";
      controls["to_date"].value = "";
      controls["source_of_member"].value = "";
      controls["custom_filter_manual_customer"].value = "";
      controls["custom_filter_type"].value = "";
      controls["custom_filter_source"].value = "";
      controls["customer_target_type"].value = "all";
      this.setState({
        controls,
        total_custom_customer_count: null,
      });
      this.allclicked();
    }

    this.setState({ controls, smsConfig });
    if (controlName === "festival_id") {
      let index = e.nativeEvent.target.selectedIndex;
      const d = e.nativeEvent.target[index].text;
      let templateData = this.state.festival.filter(item => item.festival_name === d);
      /**Change to template id when available */
      this.setState({ template_id: templateData[0].template_id })
      controls["campaign_name"].showErrorMsg = false;
      controls.campaign_name.value = d;
      controls["campaign_name"].value = d + " festival";
    } else if (controlName === "service_id") {
      let index = e.nativeEvent.target.selectedIndex;
      const d = e.nativeEvent.target[index].text;
      let data = this.state.service.filter(item => item.service_name === d);
      /**Change to template id when available */
      this.setState({ template_id: data[0].template_id })
      controls["campaign_name"].showErrorMsg = false;
      controls.campaign_name.value = d;
      controls["campaign_name"].value = d + " service";
    }
    this.setState({
      controls,
    });
    if (controlName === "purpose_id") {
      controls["festival_id"].value = "";
      controls["service_id"].value = "";
      let index = e.nativeEvent.target.selectedIndex;
      const d = e.nativeEvent.target[index].text;
      let purposeObjectIndex = purpose.findIndex(
        (p) => p.purpose_id === controlValue
      );
      let purposeObject = purpose[purposeObjectIndex];
      let template = purposeObject.template_id;
      this.setState({ template_id: template })
      if (purposeObject.filter_data) {
        this.props.resetFilter(null);
        let filterData = purposeObject.filter_data;
        let obj = {
          campaign: filterData,
        };
        await this.props.setCustomerListFilteredObj(filterData);
        this.props.onSelectTargetGroup(obj);
        this.setRedirectDataToControls(obj);
      }
      controls["campaign_name"].showErrorMsg = false;
      if (
        controlValue === "0cda85e9-117f-47f9-a4cf-4a44e4d80924" ||
        controlValue === "06f988fa-5784-492a-a8e4-4f2ea3a8e52f"
      ) {
        controls["campaign_name"].value = "";
      } else {
        controls["campaign_name"].value = d;
      }

      if (d === "Festival Wish") {
        this.setState({
          festivalTabClicked: true,
          selectServiceClicked: false,
        });
      } else if (d === "Promote Service") {
        this.setState({
          festivalTabClicked: false,
          selectServiceClicked: true,
        });
      } else {
        this.setState({
          festivalTabClicked: false,
          selectServiceClicked: false,
        });
      }

      let mappedObj = this.props.mapFilterObjWithCampaignObj();
      if (
        mappedObj.filter.purpose_type &&
        (mappedObj.filter.purpose_type === "service" ||
          mappedObj.filter.purpose_type === "tyre_purchase") &&
        mappedObj.campaign.custom_filter_type &&
        (mappedObj.campaign.custom_filter_type === "due" ||
          mappedObj.campaign.custom_filter_type === "all_due")
      ) {
        if (mappedObj.filter.purpose_type === "service") {
          this.setVehicleTypeTag();
          this.setServiceTag();
        } else if (mappedObj.filter.purpose_type === "tyre_purchase") {
          this.setVehicleTypeTag();
        }
      } else {
        this.removeVehicleTypeTag();
        this.removeServiceTag();
      }
      // debugger

      if (
        controls.campaign_name.value &&
        (controls.campaign_name.value.toLowerCase() === "tyre purchase due" ||
          controls.campaign_name.value.toLowerCase() === "service due" ||
          controls.campaign_name.value.toLowerCase() === "birthday wish" ||
          controls.campaign_name.value.toLowerCase() === "anniversary wish")
      ) {
        controls["customer_target_type"].value = "custom";
        if (
          this.props.CampaignDetailData &&
          this.props.CampaignDetailData.custom_filter_type
        ) {
          let formData = this.props.CampaignDetailData;
          formData.campaign_name = controls.campaign_name.value;
          formData.custom_filter_purpose_type = formData.purpose_type
            ? formData.purpose_type
            : null;
          if (
            formData.campaign_name &&
            formData.campaign_name.toLowerCase() === "tyre purchase due"
          ) {
            if (
              (formData.custom_filter_type &&
                (formData.custom_filter_type !== "due" ||
                  formData.custom_filter_purpose_type !== "tyre_purchase")) ||
              formData.custom_filter_type === undefined ||
              formData.custom_filter_type === null ||
              formData.custom_filter_type === ""
            ) {
              this.openFilterFromSelectPurpose();
            }
          } else if (
            formData.campaign_name &&
            formData.campaign_name.toLowerCase() === "service due"
          ) {
            if (
              (formData.custom_filter_type &&
                (formData.custom_filter_type !== "due" ||
                  formData.custom_filter_type !== "all_due")) ||
              formData.custom_filter_purpose_type !== "service" ||
              formData.custom_filter_type === undefined ||
              formData.custom_filter_type === null ||
              formData.custom_filter_type === ""
            ) {
              this.openFilterFromSelectPurpose();
            }
          } else if (
            formData.campaign_name &&
            (formData.campaign_name.toLowerCase() === "anniversary wish" ||
              formData.campaign_name.toLowerCase() === "birthday wish")
          ) {
            if (
              (formData.custom_filter_type /* &&
                formData.custom_filter_type !== "occasion" */) ||
              formData.custom_filter_type === undefined ||
              formData.custom_filter_type === null ||
              formData.custom_filter_type === ""
            ) {
              this.openFilterFromSelectPurpose();
            }
          }
        } else {
          this.openFilterFromSelectPurpose();
        }
      }
    } else if (controlName === "language") {
      if (controlValue === "other") {
        this.setState({
          maxCount: 469,
        });
      } else {
        this.setState({
          maxCount: 459,
        });
      }

      this.setState({
        controls,
      });

      this.onChangeSMSContent({
        target: { value: controls.sms_draft.value },
      });
    }

    this.handleValidation();
    this.onChangeSMSContent({
      target: {
        value: controls["sms_draft"].value ? controls["sms_draft"].value : "",
      },
    });
  };

  allclicked = () => {
    this.props.CampaignDetailData.from_date = "";
    this.props.CampaignDetailData.to_date = "";
    this.props.CampaignDetailData.vehicle_type_id = "";
    this.props.CampaignDetailData.vehicle_type_brand_id = "";
    this.props.CampaignDetailData.vehicle_type_brand_model_id = null;
    this.props.CampaignDetailData.occasion = "";
    this.props.CampaignDetailData.occasion_date_from = "";
    this.props.CampaignDetailData.occasion_date_to = "";
    this.props.CampaignDetailData.source_of_member = null;
    this.props.CampaignDetailData.download_list = false;
    this.props.CampaignDetailData.fetch_count = true;
    this.props.CampaignDetailData.search_query = null;
    this.props.CampaignDetailData.group_id = "";
    this.props.CampaignDetailData.custom_filter_manual_customer = [];
    this.props.onSelectTargetGroup({
      resetFilter: true,
    });
    // this.props.CampaignDetailData.custom_filter_type = "group";
  };

  selectPicture = () => {
    let { controls } = this.state;
    if (this.fileInput) {
      this.fileInput.click();
      controls["image_url"].showErrorMsg = false;
      this.setState({
        controls,
      });
    }
  };

  handleChangeDatePicker = (date) => {
    const { controls } = this.state;
    controls["started_at"].value = date;
    this.setState({ controls });
  };

  handleChangeTimePicker = (time) => {
    let date = new Date();
    if (time) {
      let timeValue = String(time).split(/[:\-_]/);
      date.setHours(timeValue[0]);
      date.setMinutes(timeValue[1]);
      this.setState({
        time: date.toISOString(),
      });
    } else {
      this.setState({
        time: null,
      });
    }
  };

  onClickCustomise = (e) => {
    GoogleAnalticsService.event('Campaign', 'Custom Filter Campaign View');
    this.state.custom_customer = {
      openCustom: true,
      targetgroup: "customise",
      CampaignDetailData: this.props.CampaignDetailData,
    };
    this.props.onSelectTargetGroup(this.state.custom_customer);
    const { controls } = this.state;
    if (e && e.target && e.target.name) {
      const controlName = e.target.name;
      const controlValue = e.target.value;
      controls[controlName].value = controlValue;
    }
    this.setState({ controls });
    this.close_entermsgcontent();
  };

  getpurpose = () => {
    const obj = {};
    CampaignService.getPurpose(obj)
      .then((data) => {
        if (
          this.props.CampaignDetailData &&
          this.props.CampaignDetailData.custom_filter_type &&
          !this.props.CampaignDetailData.campaign_id
        ) {
          if (data.data.data && data.data.data.length > 0) {
            let filter = [];
            if (
              this.props.CampaignDetailData.custom_filter_type === "due" ||
              this.props.CampaignDetailData.custom_filter_type === "all_due" ||
              this.props.CampaignDetailData.custom_filter_type === "occasion"
            ) {
              let type = this.props.CampaignDetailData.purpose_type;
              if (
                this.props.CampaignDetailData.purpose_type &&
                this.props.CampaignDetailData.purpose_type === "tyre_purchase"
              ) {
                type = "tyre_purchase_due";
                this.setVehicleTypeTag();
              } else if (
                this.props.CampaignDetailData.purpose_type &&
                this.props.CampaignDetailData.purpose_type === "service"
              ) {
                type = "service_due";
                this.setVehicleTypeTag();
                this.setServiceTag();
              } else if (
                this.props.CampaignDetailData.occasion &&
                this.props.CampaignDetailData.occasion === "birthday"
              ) {
                type = "birthday_wish";
              } else if (
                this.props.CampaignDetailData.occasion &&
                this.props.CampaignDetailData.occasion === "anniversary"
              ) {
                type = "anniversary_wish";
              }
              filter = data.data.data.filter((x) => x.type === type);
            } else {
              filter = data.data.data.filter((x) => x.type === "customized");
            }

            if (filter.length > 0) {
              let { controls } = this.state;
              controls.purpose_id.value = filter[0].purpose_id;
              controls.campaign_name.value = filter[0].campaign_name;
              this.setState(
                (prevState) => {
                  return {
                    ...prevState,
                    controls,
                    /**Change to template_id when available */
                    template_id: filter[0].template_id
                  };
                },
                () => {
                  this.onChangeSMSContent({
                    target: { value: filter[0].sms_draft },
                  });
                }
              );
            }
          }
        } else if (
          this.props.CampaignDetailData &&
          this.props.CampaignDetailData.DataComingFromLOC === true
        ) {
          let filter = [];
          filter = data.data.data.filter((x) => x.type === "customized");

          if (filter.length > 0) {
            let { controls } = this.state;
            controls.purpose_id.value = filter[0].purpose_id;
            controls.campaign_name.value = filter[0].campaign_name;
            this.setState(
              (prevState) => {
                return {
                  ...prevState,
                  controls,
                  template_id: filter[0].template_id
                };
              },
              () => {
                this.onChangeSMSContent({
                  target: { value: filter[0].sms_draft },
                });
              }
            );
          }
        }
        this.setState(
          {
            purpose: data.data.data,
          },
          () => {
            this.setRedirectData();
          }
        );
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        const err =
          e.response &&
            e.response.data &&
            e.response.data.error &&
            e.response.data.error[0]
            ? e.response.data.error[0]
            : null;
        const message = err && err.message ? err.message : ERROR_MESSAGE;
        ModalService.openAlert("", message, "error");
      });
  };

  getservice = () => {
    const obj = {};
    CampaignService.getService(obj).then((data) => {
      this.setState({
        service: data.data.data,
      });
    });
  };

  getFestival = async () => {
    const obj = {};
    let response = await CampaignService.getFestival(obj)
      .then((data) => {
        this.setState({
          festival: data.data.data,
        });
        return data.data.data;
      })
      .catch((err) => {
        console.log("err", err);
        return [];
      });
    return response;
  };

  getAllCustomerData = () => {
    const obj = {};
    CampaignService.getAllCustomerData(obj).then((data) => {
      let { controls } = this.state;
      let senderIds = [];
      if (data.data.data.senderIds && data.data.data.senderIds.length > 0) {
        senderIds = lodash.filter(data.data.data.senderIds, function (o) {
          if (o.whitelist === true) return o;
        });
        if (senderIds && senderIds.length > 0) {
          controls.sender_id.value = senderIds[0].sender_id;
        }
      }
      this.setState({
        total_customer: data.data.data.total_customer,
        senderIds: senderIds,
        controls,
      });
    });
  };

  uploadFile = (event) => {
    if (event.target.files[0]) {
      const file = new FormData();
      file.append("image", event.target.files[0]);
      if (event.target.files[0].size > 5000000) {
        ModalService.openAlert("", "Please upload valid file !", "error");
      }
      this.uploadCampaignImage(file);
    }
  };

  getIndicesOf = (searchStr, str, caseSensitive) => {
    let searchStrLen = searchStr.length;
    if (searchStrLen === 0) {
      return [];
    }
    let startIndex = 0,
      index,
      indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  };

  onChangeSMSContent = (e) => {
    let { controls, highLightTag, selectedTags } = this.state;
    controls["sms_draft"].showErrorMsg = false;
    if (!e) {
      e = { target: { value: controls["sms_draft"].value } };
    }
    let smsConfig = changeSMSContent(
      e.target.value,
      this.state.maxCount,
      controls.language.value === "english" ? true : false,
      controls.message_type.value === "picture" ? true : false
    );
    controls.sms_draft.value = e.target.value;
    // controls.sms_draft.touched = true;
    this.setState({
      controls,
      smsConfig: smsConfig,
    });
    this.replaceWords(controls.sms_draft.value);

    //copy paste tags
    if (
      highLightTag.length !== this.TagsWithoutOffer.length &&
      (controls.sms_draft.value !== "" ||
        controls.sms_draft.value !== null ||
        controls.sms_draft.value !== undefined)
    ) {
      this.TagsWithoutOffer.forEach((element) => {
        const regex = new RegExp(element, "g");
        if (
          highLightTag.indexOf(element) <= -1 &&
          String(controls.sms_draft.value).search(regex) > -1
        ) {
          highLightTag.push(element);
          let indexes = this.getIndicesOf(element, controls.sms_draft.value);
          if (indexes && indexes > 0) {
            indexes.forEach((index) => {
              selectedTags.push({
                indices: {
                  start: index,
                  end: index + element.length,
                },
                cssClass: "bg-gray",
                data: element,
              });
            });
          }
        }
      });

      this.setState({
        highLightTag,
        selectedTags,
      });
    }
    //   var urlRegex = /(https?:\/\/[^\s]+)/g;
    //   let url = text.replace(urlRegex, function(url) {
    //     return  url ;
    // })

    this.handleValidation();
  };

  makeTagsHighlight(text, tags) {
    const newTags = [];
    lodash.forEach(tags, (tag) => {
      const matchHashtags = new RegExp(tag, "g");
      let hashtag;
      while ((hashtag = matchHashtags.exec(text))) {
        newTags.push({
          indices: {
            start: hashtag.index,
            end: hashtag.index + tag.length,
          },
          cssClass: "bg-gray",
          data: tag,
        });
      }
    });

    return newTags;
  }

  addTags = (tag) => {
    GoogleAnalticsService.event('Campaign', 'Campaign Tag Click');
    let { selectedTags, controls, highLightTag } = this.state;
    const startIndex = controls.sms_draft.value
      ? controls.sms_draft.value.length
      : 0;
    selectedTags.push({
      indices: {
        start: startIndex,
        end: startIndex + tag.length,
      },
      cssClass: "bg-gray",
      data: tag,
    });
    highLightTag.push(tag);
    let cursorPosition = this.refTextAreaHighlight.textarea.selectionStart;
    let textBeforeCursorPosition = String(controls.sms_draft.value).substring(
      0,
      cursorPosition
    );
    let textAfterCursorPosition = String(controls.sms_draft.value).substring(
      cursorPosition,
      String(controls.sms_draft.value).length
    );
    controls.sms_draft.value =
      textBeforeCursorPosition + tag + textAfterCursorPosition;
    let smsConfig = changeSMSContent(
      controls.sms_draft.value,
      this.state.maxCount,
      true,
      false
    );
    this.setState({
      selectedTags,
      controls,
      highLightTag,
      smsConfig,
    });
    this.replaceWords(controls.sms_draft.value);
  };

  isCharOfAnyTags = (text, position, code) => {
    const tagfinal = lodash.find(this.state.selectedTags, (tag) => {
      if (code === "Backspace" || code === 8) {
        return (
          tag &&
          tag.indices &&
          position > tag.indices.start &&
          position <= tag.indices.end
        );
      }
      return (
        tag &&
        tag.indices &&
        position >= tag.indices.start &&
        position < tag.indices.end
      );
    });
    return { tagfinal };
  };

  onSmsDraftKeyDown = (event) => {
    if (event.keyCode === 8 || event.code === "Delete") {
      const tag = this.isCharOfAnyTags(
        event.target.value,
        event.target.selectionEnd - 1,
        event.keyCode
      );

      if (tag.tagfinal) {
        event.preventDefault();
        let { selectedTags, highLightTag, controls } = this.state;
        let tmpVal =
          event.target.value.slice(0, tag.tagfinal.indices.start) +
          event.target.value.slice(tag.tagfinal.indices.end);
        let index = selectedTags.findIndex(
          (x) => x.indices.end === tag.tagfinal.indices.end
        );
        highLightTag.splice(index, 1);
        selectedTags.splice(index, 1);
        if (!tmpVal) {
          highLightTag = [];
          selectedTags = [];
          tmpVal = "";
        }
        controls.sms_draft.value = tmpVal;
        let smsConfig = changeSMSContent(
          tmpVal,
          this.state.maxCount,
          true,
          false
        );
        this.setState({
          controls,
          highLightTag,
          selectedTags,
          smsConfig: smsConfig,
        });
        this.replaceWords(controls.sms_draft.value);
      }
    }
  };

  replaceWords(text) {
    let userDetail = Storage.getUserDetail();
    if (text) {
      text = text.replace(
        /#CustomerName/g,
        (userDetail && userDetail.owner_name) || "customer"
      );
      text = text.replace(
        /#StoreName/g,
        (userDetail && userDetail.business_name) || "store name"
      );
      text = text.replace(
        /#MakeName/g,
        (userDetail && userDetail.business_name) || "store name"
      );
      text = text.replace(
        /#PhoneNumber/g,
        (userDetail && userDetail.telephone_no_1) || "store name"
      );
      text = text.replace(
        /#ModelName/g,
        (userDetail && userDetail.business_name) || "store name"
      );
    }
    this.setState({
      tooltipText: text,
    });
  }

  getCustomiseCustomerData = () => {
    const obj = {};
    CampaignService.getCustomiseCustomerData(obj).then((data) => {
      this.setState({
        total_customise_customer: data.data.data.total_customer,
      });
    }).catch(e => {
      console.log('get customer api error', e)
    });
  };

  setFilterData = (e) => {
    const { controls } = this.state;
    //when after select select filter the count of customer come from backenf that comes here
    if (e.total_customer || e.total_customer === 0 || e.total_customer === '0') {
      this.setState({
        total_custom_customer_count: e.total_customer,
      });
    }
    //Manually filter data comes here
    if (e.custom_filter_manual_customer) {
      this.setState({
        total_custom_customer_count: e.custom_filter_manual_customer.length,
      });
      controls["custom_filter_manual_customer"].value =
        e.custom_filter_manual_customer;
      this.setState({ controls });
    }

    if (
      e.resetFilter === true ||
      !(
        (this.props.filterStates &&
          this.props.filterStates.filter &&
          Object.keys(this.props.filterStates.filter).length > 0) ||
        (this.props.filteredObj &&
          Object.keys(this.props.filteredObj).length > 0)
      )
    ) {
      // const { controls } = this.state;
      if (
        this.props.filteredObj &&
        this.props.filteredObj.filter_type !== "last_visit"
      ) {
        controls["customer_target_type"].value = "all";
        this.setState({ total_custom_customer_count: null });
      }
    }

    // when you use campaign customise component for filter then all data comes in e.obj {object} after hit the service but when you select manual update data {phone no}
    // then that comes in e.custom_filter_manual_customer line no -1057
    // but if you come to edit or duplicate the campaign then that data comes from component did mount

    if (e.obj) {
      let { controls } = this.state;
      controls["source_of_member"].value = e.obj.source_of_member;
      controls["from_date"].value = e.obj.from_date;
      controls["to_date"].value = e.obj.to_date;
      controls["custom_filter_vehicle_type_id"].value =
        e.obj.custom_filter_vehicle_type_id;
      controls["custom_filter_vehicle_type_brand_id"].value =
        e.obj.custom_filter_vehicle_type_brand_id;
      controls["custom_filter_vehicle_type_brand_model_id"].value =
        e.obj.custom_filter_vehicle_type_brand_model_id;

      controls["custom_filter_occasion"].value = e.obj.occasion;
      controls["custom_filter_occasion_date_from"].value =
        e.obj.occasion_date_from;
      controls["custom_filter_occasion_date_to"].value = e.obj.occasion_date_to;
      controls["group_id"].value = e.obj.group_id;
      // @NOTE: updte custom filter type
      // if (e.obj.group_id.value && e.obj.group_id.value.length !== 0) {
      //   controls["custom_filter_type"].value = "group";
      // } else {
      //   if (e.obj && e.obj.custom_filter_type) {
      //     controls["custom_filter_type"].value = e.obj.custom_filter_type;
      //   }
      // }
      controls["custom_filter_manual_customer"].value = e.obj
        .custom_filter_manual_customer
        ? e.obj.custom_filter_manual_customer
        : null;
      this.setState({
        obj: e.obj,
        controls,
      });
    }
  };

  setRedirectData = async () => {
    let redirectData = {};
    if (this.props.redirectDetails) {
      redirectData = Object.assign(this.props.redirectDetails);
    }
    this.setRedirectDataToControls(redirectData);
    let { controls } = this.state;
    if (
      redirectData.campaign &&
      redirectData.campaign.name &&
      (redirectData.campaign.name.toLowerCase() === "tyre purchase due" ||
        redirectData.campaign.name.toLowerCase() === "service due")
    ) {
      controls["customer_target_type"].value = "custom";
      controls["campaign_name"].value = redirectData.campaign.name;
      await this.setState({
        isLoading: true,
        controls,
      });
      setTimeout(() => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.props.openFilterFromSelectPurpose();
          }
        );
      }, 3000);
    }
  };

  setRedirectDataToControls = async (redirectData) => {
    let { controls, purpose, festivalTabClicked } = this.state;
    if (redirectData && redirectData.campaign) {
      if (redirectData.campaign.type) {
        let filter = purpose.filter(
          (x) => x.type === redirectData.campaign.type
        );
        if (filter && filter.length !== 0) {
          /**Change to template id when available */
          this.setState({ template_id: filter[0].template_id })
        }
        if (filter.length > 0) {
          controls.purpose_id.value = filter[0].purpose_id;
          controls.campaign_name.value = filter[0].campaign_name;
          this.onChangeSMSContent({
            target: { value: filter[0].sms_draft },
          });
        }
      }
      if (redirectData.campaign.purpose_id) {
        let filter = purpose.filter(
          (x) => x.purpose_id === redirectData.campaign.purpose_id
        );
        this.setState({ template_id: filter[0].template_id })
        if (filter.length > 0) {
          controls.purpose_id.value = filter[0].purpose_id;
          controls.campaign_name.value = filter[0].campaign_name;
          this.onChangeSMSContent({
            target: { value: filter[0].sms_draft },
          });
        }
      }

      if (
        redirectData.campaign.type === "anniversary_wish" ||
        redirectData.campaign.type === "birthday_wish" ||
        redirectData.campaign.filter_type === "anniversary_wish" ||
        redirectData.campaign.filter_type === "birthday_wish"
      ) {
        if (redirectData.campaign.count <= 0) {
          return;
        }
      }
      if (
        redirectData.campaign.custom_filter === "festival_wish" ||
        redirectData.campaign.type === "festival_wish"
      ) {
        festivalTabClicked = true;
        if (redirectData.campaign.festival_id || redirectData.campaign.id) {
          controls.festival_id.value = redirectData.campaign.festival_id
            ? redirectData.campaign.festival_id
            : redirectData.campaign.id;
          let response = await this.getFestival();
          if (response && Array.isArray(response) && response.length > 0) {
            response.forEach((element) => {
              if (element.festival_id === controls.festival_id.value) {
                controls.sms_draft.value = element.sms_draft;
                controls["campaign_name"].value =
                  element.festival_name + " Festival";
                this.onChangeSMSContent({
                  target: { value: controls.sms_draft.value },
                });
                this.replaceWords(controls["sms_draft"].value);
              }
            });
          }
        }

        this.setState({ festivalTabClicked });
      }

      if (
        redirectData.campaign.type &&
        redirectData.campaign.type === "promote_service"
      ) {
        if (redirectData.campaign.id) {
          controls.service_id.value = redirectData.campaign.id;
          (this.state.service || []).forEach((element) => {
            if (element.service_id === controls.sender_id.value) {
              controls.sms_draft.value = element.sms_draft;
              controls["campaign_name"].value =
                element.service_name + " Service";
              this.onChangeSMSContent({
                target: { value: controls.sms_draft.value },
              });
              this.replaceWords(controls["sms_draft"].value);
            }
          });
        }
        this.setState({
          controls,
          festivalTabClicked: false,
          selectServiceClicked: true,
        });
      }

      if (
        redirectData.campaign.filter_data &&
        redirectData.campaign.filter_data.filter_type
      ) {
        controls.customer_target_type.value = "custom";
      }

      if (
        redirectData.campaign.type === "anniversary_wish" ||
        redirectData.campaign.type === "birthday_wish" ||
        redirectData.campaign.filter_type
      ) {
        if (
          redirectData.campaign.filter_type !== "festival" ||
          redirectData.campaign.custom_filter !== "festival_wish"
        ) {
          controls["customer_target_type"].value = "custom";
        } else {
          this.resteCount();
        }
      }
      this.setState({ controls }, () => {
        this.props.removeDashboardRedirectData();
      });
    }
  };

  back = (e) => {
    this.state.custom_customer = {
      createCampaign: true,
      CampaignDetailData: this.props.CampaignDetailData,
    };
    this.props.onSelectTargetGroup(this.state.custom_customer);
  };

  uploadCampaignImage = (formData) => {
    this.setState({
      isLoading: true,
    });
    CampaignService.uploadCampaignImage(formData)
      .then((data) => {
        let { controls } = this.state;
        if (data.data.data.image_url) {
          controls.image_url.value = data.data.data.image_url;
        }
        this.setState({
          controls,
          isLoading: false,
        });
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        const err =
          e.response &&
            e.response.data &&
            e.response.data.error &&
            e.response.data.error[0]
            ? e.response.data.error[0]
            : null;
        const message = err && err.message ? err.message : ERROR_MESSAGE;
        ModalService.openAlert("", message, "error");
      });
  };

  createCampaign = (e) => {
    e.preventDefault();
    const { controls } = this.state;
    let campaignFiterObj = {};
    let mappedObj = this.props.mapFilterObjWithCampaignObj();
    campaignFiterObj = mappedObj.campaign;

    if (!controls.campaign_name.value) {
      controls["campaign_name"].showErrorMsg = true;
      this.setState({ controls });
      return;
    }

    if (
      controls.communication_type.value === "notification" &&
      !controls.notification_title.value
    ) {
      controls["notification_title"].showErrorMsg = true;
      this.setState({ controls });
      return;
    }

    if (
      !controls.sms_draft.showErrorMsg &&
      this.state.smsConfig.isNotValidMinCount
    ) {
      return;
    }

    if (!this.handleValidation(true)) {
      return true;
    }
    if (this.state.isNotValidMinCount) {
      return true;
    }

    if (
      this.state.total_custom_customer_count === 0 &&
      controls.communication_type.value !== "whatsapp"
    ) {
      const err =
        "There is no customer found with applied filter . Please change filter criteria";
      const message = err;
      ModalService.openAlert("", message, "error");
      return;
    }
    let started_at;
    if (!this.state.time && controls.is_scheduled.value) {
      this.setState({
        errorTime: true,
      });
      return;
    } else {
      this.setState({
        errorTime: false,
      });
    }
    if (this.state.controls.started_at.value && this.state.time) {
      let time = moment(this.state.time);
      started_at = new Date(this.state.controls.started_at.value);
      started_at.setHours(time.hours());
      started_at.setMinutes(moment(time.minutes()));

      controls["started_at"].value = started_at;
      controls["started_at"].valid = false;
      this.setState({
        controls,
      });
    } else {
      controls["started_at"].valid = true;
      controls["started_at"].value = this.state.controls.started_at.value;
      this.setState({
        controls,
      });
    }

    let formData = {
      is_scheduled: controls.is_scheduled.value
        ? controls.is_scheduled.value
        : false,
      purpose_id: controls.purpose_id.value ? controls.purpose_id.value : null,
      campaign_name: controls.campaign_name.value
        ? controls.campaign_name.value
        : null,
      customer_target_type: controls.customer_target_type.value
        ? controls.customer_target_type.value
        : null,
      message_type: controls.message_type.value
        ? controls.message_type.value
        : null,
      language: controls.language.value ? controls.language.value : "english",
      sms_draft: controls.sms_draft.value ? controls.sms_draft.value : null,
      image_url: controls.image_url.value ? controls.image_url.value : null,
      started_at: this.state.controls.is_scheduled.value ? started_at : null,
      campaign_notification_id: controls.campaign_notification_id.value
        ? controls.campaign_notification_id.value
        : null,
      // @Note: Need to see
      custom_filter_manual_customer: controls.custom_filter_manual_customer
        .value
        ? controls.custom_filter_manual_customer.value
        : null,
      service_id: controls.service_id.value ? controls.service_id.value : null,
      festival_id: controls.festival_id.value
        ? controls.festival_id.value
        : null,

      custom_filter_type: controls["custom_filter_type"].value
        ? controls["custom_filter_type"].value
        : null,

      // group_id: controls.group_id.value ? controls.group_id.value : null,
      from_date: controls.from_date.value,
      to_date: controls.to_date.value,
      // custom_filter_occasion: controls.custom_filter_occasion.value
      //   ? controls.custom_filter_occasion.value
      //   : null,
      // custom_filter_occasion_date_from: controls
      //   .custom_filter_occasion_date_from.value
      //   ? controls.custom_filter_occasion_date_from.value
      //   : null,
      // custom_filter_occasion_date_to: controls.custom_filter_occasion_date_to
      //   .value
      //   ? controls.custom_filter_occasion_date_to.value
      //   : null,
      // custom_filter_vehicle_type_id: controls.custom_filter_vehicle_type_id
      //   .value
      //   ? controls.custom_filter_vehicle_type_id.value
      //   : null,
      // custom_filter_vehicle_type_brand_id: controls
      //   .custom_filter_vehicle_type_brand_id.value
      //   ? controls.custom_filter_vehicle_type_brand_id.value
      //   : null,
      // custom_filter_vehicle_type_brand_model_id: controls
      //   .custom_filter_vehicle_type_brand_model_id.value
      //   ? controls.custom_filter_vehicle_type_brand_model_id.value
      //   : null,
      // source_of_member: controls.source_of_member.value
      //   ? controls.source_of_member.value
      //   : null,
      cc_self: this.state.cc_self ? this.state.cc_self : false,
      customerIds: controls.customerIds.value,
    };
    if (controls.sender_id.value) {
      formData.sender_id = controls.sender_id.value;
    }
    if (controls.communication_type.value === "notification") {
      formData["notification_title"] = controls.notification_title.value
        ? controls.notification_title.value
        : "";
    }
    formData["communication_type"] = controls.communication_type.value
      ? controls.communication_type.value
      : "sms";
    formData["action"] = controls.action.value
      ? controls.action.value
      : null;
    if (controls.customer_target_type.value === "jk_user") {
      if (
        this.state.jkUserFilterData &&
        Object.keys(this.state.jkUserFilterData).length > 0
      ) {
        formData = { ...this.state.jkUserFilterData, ...formData };
      } else {
        ModalService.openAlert(
          "",
          "There is no customer found with applied filter . Please change filter criteria",
          "error"
        );
        return;
      }
    }
    if (controls.customer_target_type.value === "jk_secondary_point") {
      if (
        this.state.jkSecondaryUserFilterData &&
        Object.keys(this.state.jkSecondaryUserFilterData).length > 0
      ) {
        formData = { ...this.state.jkSecondaryUserFilterData, ...formData };
      } else {
        ModalService.openAlert(
          "",
          "There is no customer found with applied filter . Please change filter criteria",
          "error"
        );
        return;
      }
    }
    if (controls.customer_target_type.value === "jk_promotion_and_services") {
      if (
        this.state.jkPromotionalEventsUsersData &&
        Object.keys(this.state.jkPromotionalEventsUsersData).length > 0
      ) {
        formData = { ...this.state.jkPromotionalEventsUsersData, ...formData };
      } else {
        ModalService.openAlert(
          "",
          "There is no customer found with applied filter . Please change filter criteria",
          "error"
        );
        return;
      }
    }
    if (controls.customer_target_type.value === "jk_cip_user") {
      if (
        this.state.applyFilterCIPUserFilter &&
        Object.keys(this.state.applyFilterCIPUserFilter).length > 0
      ) {
        formData = { ...this.state.applyFilterCIPUserFilter, ...formData };
      } else {
        ModalService.openAlert(
          "",
          "There is no customer found with applied filter . Please change filter criteria",
          "error"
        );
        return;
      }
    }

    if (controls.customer_target_type.value === "whatsapp") {
      if (
        this.state.whatsAppFilterData &&
        Object.keys(this.state.whatsAppFilterData).length > 0
      ) {
        formData = { ...this.state.whatsAppFilterData, ...formData };
      } else {
        ModalService.openAlert(
          "",
          "There is no customer found with applied filter . Please change filter criteria",
          "error"
        );
        return;
      }
    }

    if (controls.is_scheduled.value && controls.started_at.value) {
      if (
        new Date().toISOString() >
        new Date(controls.started_at.value).toISOString()
      ) {
        ModalService.openAlert(
          "",
          "Scheduled date should be greater than current time",
          "error"
        );
        return;
      }
    }

    formData = { ...formData, ...campaignFiterObj };
    if (
      controls.custom_filter_manual_customer.value &&
      controls.custom_filter_manual_customer.value.length > 0
    ) {
      formData.custom_filter_manual_customer =
        controls.custom_filter_manual_customer.value;
    }

    let purpose = [];
    if (controls.purpose_id.value) {
      purpose = this.state.purpose.filter(
        (x) => x.purpose_id === controls.purpose_id.value
      );
    }

    if (controls.purpose_id && controls.purpose_id.value && purpose.length > 0) {
      if (purpose[0].type === 'corona_alert') {
        formData.custom_filter_purpose_type = 'all';
      }
    }
    if (
      purpose.length > 0 &&
      purpose[0].type &&
      purpose[0].type === "tyre_purchase_due"
    ) {
      if (
        (formData.custom_filter_type &&
          formData.custom_filter_purpose_type !== "tyre_purchase") ||
        formData.custom_filter_type === undefined ||
        formData.custom_filter_type === null ||
        formData.custom_filter_type === ""
      ) {
        ModalService.openAlert(
          "",
          `You have selected campaign purpose as ${formData.campaign_name} but the filter criteria selected does not match with the purpose selection. Please update filter criteria.`,
          "error"
        );
        return;
      }
    } else if (
      purpose.length > 0 &&
      purpose[0].type &&
      purpose[0].type === "service_due"
    ) {
      if (
        (formData.custom_filter_type &&
          formData.custom_filter_type !== "due" &&
          formData.custom_filter_type !== "all_due") ||
        formData.custom_filter_purpose_type !== "service" ||
        formData.custom_filter_type === undefined ||
        formData.custom_filter_type === null ||
        formData.custom_filter_type === ""
      ) {
        ModalService.openAlert(
          "",
          `You have selected campaign purpose as ${formData.campaign_name} but the filter criteria selected does not match with the purpose selection. Please update filter criteria.`,
          "error"
        );
        return;
      }
    } else if (
      (purpose.length > 0 &&
        purpose[0].type &&
        purpose[0].type === "birthday_wish") ||
      (purpose.length > 0 &&
        purpose[0].type &&
        purpose[0].type === "anniversary_wish")
    ) {
      if (
        (formData.custom_filter_type &&
          formData.custom_filter_type !== "occasion") ||
        formData.custom_filter_type === undefined ||
        formData.custom_filter_type === null ||
        formData.custom_filter_type === ""
      ) {
        ModalService.openAlert(
          "",
          `You have selected campaign purpose as ${formData.campaign_name} but the filter criteria selected does not match with the purpose selection. Please update filter criteria.`,
          "error"
        );
        return;
      }
    }

    if (!!formData.custom_filter_purpose_type === false) {
      formData.custom_filter_purpose_type = 'all';
    }

    this.setState({
      isLoading: true,
    });
    CampaignService.createCampaign(formData, this.state.template_id)
      .then((data) => {
        this.setState({
          controls,
          isLoading: false,
        });
        swal({
          title: "Congratulations !",
          text: data.data.message,
          icon: "success",
          type: "success",
        }).then((value) => {
          this.props.resetData();
          this.resetControls();
        });
        this.state.custom_customer = {
          campaignCreated: true,
          is_scheduled: controls.is_scheduled.value
            ? controls.is_scheduled.value
            : false,
        };
        this.props.onSelectTargetGroup(this.state.custom_customer);
        window.scrollTo(0, 0);
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        const err =
          e.response &&
            e.response.data &&
            e.response.data.error &&
            e.response.data.error[0]
            ? e.response.data.error[0]
            : null;
        const message = err && err.message ? err.message : ERROR_MESSAGE;
        ModalService.openAlert("", message, "error");
      });
  };

  editCampaign = (e) => {
    e.preventDefault();
    const { controls } = this.state;
    let campaignFiterObj = {};
    let mappedObj = this.props.mapFilterObjWithCampaignObj();
    campaignFiterObj = mappedObj.campaign;
    let started_at;
    if (this.state.controls.started_at.value && this.state.time) {
      let time = moment(this.state.time);
      started_at = new Date(this.state.controls.started_at.value);
      started_at.setHours(time.hours());
      started_at.setMinutes(moment(time.minutes()));
      controls["from_date"].valid = false;
      this.setState({
        controls,
      });
    } else {
      controls["from_date"].valid = true;
      this.setState({
        controls,
      });
    }

    if (
      !controls.sms_draft.showErrorMsg &&
      this.state.smsConfig.isNotValidMinCount
    ) {
      return;
    }

    if (
      controls.communication_type.value === "notification" &&
      !controls.notification_title.value
    ) {
      controls["notification_title"].showErrorMsg = true;
      this.setState({ controls });
      return;
    }

    let formData = {
      is_scheduled: controls.is_scheduled.value
        ? controls.is_scheduled.value
        : false,
      purpose_id: controls.purpose_id.value ? controls.purpose_id.value : null,
      campaign_name: controls.campaign_name.value
        ? controls.campaign_name.value
        : null,
      customer_target_type: controls.customer_target_type.value
        ? controls.customer_target_type.value
        : null,
      message_type: controls.message_type.value
        ? controls.message_type.value
        : null,
      language: controls.language.value ? controls.language.value : "english",
      sms_draft: controls.sms_draft.value ? controls.sms_draft.value : null,
      image_url: controls.image_url.value ? controls.image_url.value : null,
      started_at: started_at,
      campaign_notification_id: controls.campaign_notification_id.value
        ? controls.campaign_notification_id.value
        : null,
      // custom_filter_manual_customer: controls.custom_filter_manual_customer
      //   .value
      //   ? controls.custom_filter_manual_customer.value
      //   : null,
      service_id: controls.service_id.value ? controls.service_id.value : null,
      festival_id: controls.festival_id.value
        ? controls.festival_id.value
        : null,

      // custom_filter_type: controls.custom_filter_type.value
      //   ? controls.custom_filter_type.value
      //   : null,
      // group_id: controls.group_id.value ? controls.group_id.value : null,
      from_date: controls.from_date.value,
      to_date: controls.to_date.value,
      // custom_filter_occasion: controls.custom_filter_occasion.value
      //   ? controls.custom_filter_occasion.value
      //   : null,
      // custom_filter_occasion_date_from: controls
      //   .custom_filter_occasion_date_from.value
      //   ? controls.custom_filter_occasion_date_from.value
      //   : null,
      // custom_filter_occasion_date_to: controls.custom_filter_occasion_date_to
      //   .value
      //   ? controls.custom_filter_occasion_date_to.value
      //   : null,
      // custom_filter_vehicle_type_id: controls.custom_filter_vehicle_type_id
      //   .value
      //   ? controls.custom_filter_vehicle_type_id.value
      //   : null,
      // custom_filter_vehicle_type_brand_id: controls
      //   .custom_filter_vehicle_type_brand_id.value
      //   ? controls.custom_filter_vehicle_type_brand_id.value
      //   : null,
      // custom_filter_vehicle_type_brand_model_id: controls
      //   .custom_filter_vehicle_type_brand_model_id.value
      //   ? controls.custom_filter_vehicle_type_brand_model_id.value
      //   : null,
      // source_of_member: controls.source_of_member.value
      //   ? controls.source_of_member.value
      //   : null,
      cc_self: this.state.cc_self,
      customerIds: controls.customerIds.value,
    };

    if (controls.communication_type.value === "notification") {
      formData["notification_title"] = controls.notification_title.value
        ? controls.notification_title.value
        : "";
    } else if (controls.communication_type.value === "sms") {
      formData["notification_title"] = "";
      formData["communication_type"] = controls.communication_type.value
        ? controls.communication_type.value
        : "sms";
    }

    formData["communication_type"] = controls.communication_type.value
      ? controls.communication_type.value
      : "sms";

    if (controls.customer_target_type.value === "jk_user") {
      if (
        this.state.jkUserFilterData &&
        Object.keys(this.state.jkUserFilterData).length > 0
      ) {
        formData = { ...this.state.jkUserFilterData, ...formData };
      } else {
        ModalService.openAlert("", "No customer records found", "error");
        return;
      }
    }
    if (controls.customer_target_type.value === "jk_secondary_point") {
      if (
        this.state.jkSecondaryUserFilterData &&
        Object.keys(this.state.jkSecondaryUserFilterData).length > 0
      ) {
        formData = { ...this.state.jkSecondaryUserFilterData, ...formData };
      } else {
        ModalService.openAlert("", "No customer records found", "error");
        return;
      }
    }
    if (controls.customer_target_type.value === "jk_promotion_and_services") {
      if (
        this.state.jkPromotionalEventsUsersData &&
        Object.keys(this.state.jkPromotionalEventsUsersData).length > 0
      ) {
        formData = { ...this.state.jkPromotionalEventsUsersData, ...formData };
      } else {
        ModalService.openAlert("", "No customer records found", "error");
        return;
      }
    }

    if (controls.customer_target_type.value === "jk_cip_user") {
      if (
        this.state.applyFilterCIPUserFilter &&
        Object.keys(this.state.applyFilterCIPUserFilter).length > 0
      ) {
        formData = { ...this.state.applyFilterCIPUserFilter, ...formData };
      } else {
        ModalService.openAlert("", "No customer records found", "error");
        return;
      }
    }

    if (controls.customer_target_type.value === "whatsapp") {
      if (
        this.state.whatsAppFilterData &&
        Object.keys(this.state.whatsAppFilterData).length > 0
      ) {
        formData = { ...this.state.whatsAppFilterData, ...formData };
      } else {
        ModalService.openAlert("", "No customer records found", "error");
        return;
      }
    }

    formData = { ...formData, ...campaignFiterObj };

    this.setState({
      isLoading: true,
    });
    CampaignService.editCampaign(
      formData,
      this.props.CampaignDetailData.campaign_id
    )
      .then((data) => {
        this.setState({
          controls,
          isLoading: false,
        });
        swal({
          title: "Congratulations !",
          text: data.data.message,
          icon: "success",
          type: "success",
        }).then((value) => {
          this.props.resetData();
          this.resetControls();
        });
        this.state.custom_customer = {
          campaignCreated: true,
          is_scheduled: controls.is_scheduled.value
            ? controls.is_scheduled.value
            : false,
        };
        this.props.onSelectTargetGroup(this.state.custom_customer);
        window.scrollTo(0, 0);
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        const err =
          e.response &&
            e.response.data &&
            e.response.data.error &&
            e.response.data.error[0]
            ? e.response.data.error[0]
            : null;
        const message = err && err.message ? err.message : ERROR_MESSAGE;
        ModalService.openAlert("", message, "error");
      });
  };

  applyFilterJkUser = async (data) => {
    this.getNotificationActions({ roles: data.filter_target_ids })

    let { jkUserFilterData, total_custom_customer_count } = this.state;
    if (data && Object.keys(data).length > 0) {
      jkUserFilterData = data;
      total_custom_customer_count = data.counts;
    } else {
      jkUserFilterData = {};
      total_custom_customer_count = 0;
    }
    await this.setState({
      jkUserFilterData,
      total_custom_customer_count: this.state.total_custom_customer_count = total_custom_customer_count,
      openJkUserFilter: false,
    });
  };

  applyFilterjkPromotionalEventsUsersData = (data) => {
    if (data && Object.keys(data).length > 0) {
      this.setState({
        filterType: 'promotional',
        jkPromotionalEventsUsersData: data,
        total_custom_customer_count: data.counts,
        openPromotionalEventsUsers: false,
      });
    } else {
      this.setState({
        filterType: 'promotional',
        jkPromotionalEventsUsersData: {},
        total_custom_customer_count: this.state.total_custom_customer_count = 0,
        openPromotionalEventsUsers: false,
      });
    }
  };


  applyFilterCIPUserFilter = data => {
    if (data && Object.keys(data).length > 0) {
      this.setState({
        filterType: 'cip_user',
        applyFilterCIPUserFilter: data,
        total_custom_customer_count: data.counts,
        openPromotionalEventsUsers: false
      });
    } else {
      this.setState({
        filterType: 'cip_user',
        applyFilterCIPUserFilter: {},
        total_custom_customer_count: this.state.total_custom_customer_count = 0,
        openPromotionalEventsUsers: false
      });
    }
  };

  applyFilterwhatsAppFilterData = async data => {
    let { whatsAppFilterData, total_custom_customer_count } = this.state;
    if (data && data.ids && data.ids.length > 0) {
      whatsAppFilterData = data;
      total_custom_customer_count = data.counts;
    } else {
      whatsAppFilterData = {};
      total_custom_customer_count = 0;
    }
    await this.setState({
      whatsAppFilterData: whatsAppFilterData,
      total_custom_customer_count: this.state.total_custom_customer_count = total_custom_customer_count,
      openWhatsappEventsUsers: false,
    });
  };

  applyFilterjkSecondaryUserFilter = (data) => {

    if (data && Object.keys(data).length > 0) {
      this.setState({
        filterType: 'warranty_users',
        jkSecondaryUserFilterData: data,
        total_custom_customer_count: data.counts,
        openCampaignSecondaryUserFilter: false,
      });
    } else {
      this.setState({
        filterType: 'warranty_users',
        jkSecondaryUserFilterData: {},
        total_custom_customer_count: this.state.total_custom_customer_count = 0,
        openCampaignSecondaryUserFilter: false,
      });
    }
  };

  onClickJkUser = (flag) => {
    let { controls, total_custom_customer_count } = this.state;
    if (controls.customer_target_type.value !== "jk_user") {
      controls.customer_target_type.value = "jk_user";
      total_custom_customer_count = null;
    }
    controls["custom_filter_manual_customer"].value = null;

    this.setState({
      controls,
      openJkUserFilter: flag,
      total_custom_customer_count,
      jkPromotionalEventsUsersData: {},
      whatsAppFilterData: {},
      jkSecondaryUserFilterData: {},
    });
    this.TagsWithoutOffer = ["#CustomerName"];

    this.setState({
      controls,
    });
  };

  onClickSecondaryUserFilter = (flag) => {
    let { controls, total_custom_customer_count } = this.state;
    if (controls.customer_target_type.value !== "jk_secondary_point") {
      total_custom_customer_count = 0;
    }
    controls.customer_target_type.value = "jk_secondary_point";

    controls["custom_filter_manual_customer"].value = null;

    this.setState({
      openCampaignSecondaryUserFilter: flag,
      controls,
      total_custom_customer_count,
      jkPromotionalEventsUsersData: {},
      whatsAppFilterData: {},
      jkUserFilterData: {},
      applyFilterCIPUserFilter: {}
    });
    this.TagsWithoutOffer = ["#CustomerName", "#MakeName", "#ModelName"];

    controls["communication_type"].value = "sms";
  };

  onClickPromotionalEventsUsers = (flag) => {
    let { controls, total_custom_customer_count } = this.state;
    if (controls.customer_target_type.value !== "jk_promotion_and_services" && this.state.filterType !== 'promotional') {
      total_custom_customer_count = 0;
    }
    controls.customer_target_type.value = "jk_promotion_and_services";

    controls["custom_filter_manual_customer"].value = null;

    this.setState({
      openCampaignSecondaryUserFilter: flag,
      // openPromotionalEventsUsers: flag,
      controls,
      total_custom_customer_count,
      jkSecondaryUserFilterData: {},
      jkUserFilterData: {},
      applyFilterCIPUserFilter: {}
    });
    this.TagsWithoutOffer = ["#CustomerName"];

    controls["communication_type"].value = "sms";
    this.setState({
      controls
    });
  };

  onClickCIPEventsUsers = flag => {
    let { controls, total_custom_customer_count } = this.state;
    if (controls.customer_target_type.value !== "jk_cip_user" && this.state.filterType !== 'cip_user') {
      total_custom_customer_count = 0;
    }
    controls.customer_target_type.value = "jk_cip_user";

    controls["custom_filter_manual_customer"].value = null;

    this.setState({
      openCampaignSecondaryUserFilter: flag,
      // openPromotionalEventsUsers: flag,
      controls,
      total_custom_customer_count,
      jkSecondaryUserFilterData: {},
      jkUserFilterData: {},
      jkPromotionalEventsUsersData: {}
    });
    this.TagsWithoutOffer = ["#CustomerName"];

    controls["communication_type"].value = "sms";
    this.setState({
      controls,
    });
  };

  onClickWhatsAppEventsUsers = (flag) => {
    let { controls, total_custom_customer_count } = this.state;
    if (controls.customer_target_type.value !== "whatsapp") {
      total_custom_customer_count = 0;
    }
    controls.customer_target_type.value = "whatsapp";

    controls["custom_filter_manual_customer"].value = null;

    this.setState({
      openWhatsappEventsUsers: flag,
      controls,
      total_custom_customer_count,
      jkSecondaryUserFilterData: {},
      jkUserFilterData: {},
      applyFilterCIPUserFilter: {}
    });
    this.TagsWithoutOffer = ["#CustomerName"];

    controls["communication_type"].value = "whatsapp";
    this.setState({
      controls,
    });
  };

  openManualDataFilter = (Bool) => {
    let { controls, total_custom_customer_count } = this.state;
    this.setState({
      openManualDataFilter: Bool,
    });

    if (controls.customer_target_type.value.trim() !== "custom") {
      total_custom_customer_count = 0;
      this.setState({
        total_custom_customer_count,
      });
    }
    controls["customer_target_type"].value = "custom";
    controls["communication_type"].value = "sms";
    this.setState({
      controls,
    });
  };

  scrollTo(id) {
    var scroller = Scroll.scroller;
    scroller.scrollTo(id, {
      duration: 1000,
      delay: 100,
      smooth: "easeInOutQuint",
      offset: -80,
    });
  }

  Show_entermsgcontent = (e) => {
    this.setState({
      Show_entermsgcontent: true,
    });
  };

  close_entermsgcontent = (e) => {
    this.setState({
      Show_entermsgcontent: false,
    });
  };

  scrollBottom(id, name) {
    var scroller = Scroll.scroller;
    scroller.scrollTo(id, {
      duration: 1000,
      delay: 100,
      smooth: "easeInOutQuint",
      offset: -80,
    });
    this.setState({ tooltipOpen: true, tooltip_name: name });
  }

  addgetCustomCustomer = (e) => {
    // let { controls } = this.state;
    let reqData = {};
    if (this.props.CampaignDetailData) {
      let obj = this.props.mapCampaignObjWithFilterObj(
        this.props.CampaignDetailData
      );
      reqData = { ...reqData, ...obj };
    }
    // if (
    //   controls.custom_filter_occasion_date_from &&
    //   controls.custom_filter_occasion_date_to.value
    // ) {
    //   let from_date = new Date(controls.custom_filter_occasion_date_from.value);
    //   from_date.setHours(0);
    //   from_date.setMinutes(0);
    //   controls.custom_filter_occasion_date_from.value = from_date;
    // }
    // if (
    //   controls.custom_filter_occasion_date_to &&
    //   controls.custom_filter_occasion_date_to.value
    // ) {
    //   let to_date = new Date(controls.custom_filter_occasion_date_to.value);
    //   to_date.setHours(23);
    //   to_date.setMinutes(59);
    //   controls.custom_filter_occasion_date_to.value = to_date;
    // }

    // if (controls.from_date && controls.from_date.value) {
    //   let from_date = new Date(controls.from_date.value);
    //   from_date.setHours(0);
    //   from_date.setMinutes(0);
    //   controls.from_date.value = from_date;
    // }
    // if (controls.to_date && controls.to_date.value) {
    //   let to_date = new Date(controls.to_date.value);
    //   to_date.setHours(23);
    //   to_date.setMinutes(59);
    //   controls.to_date.value = to_date;
    // }
    // this.setState({
    //   controls
    // });
    // var obj = {
    //   from_date: controls.from_date.value,
    //   to_date: controls.to_date.value,
    //   vehicle_type_id: controls.custom_filter_vehicle_type_id.value,
    //   vehicle_type_brand_id: controls.custom_filter_vehicle_type_brand_id.value,
    //   vehicle_type_brand_model_id: controls
    //     .custom_filter_vehicle_type_brand_model_id.value
    //     ? controls.custom_filter_vehicle_type_brand_model_id.value
    //     : null,
    //   occasion: controls.custom_filter_occasion.value,
    //   occasion_date_from: controls.custom_filter_occasion_date_from.value,
    //   occasion_date_to: controls.custom_filter_occasion_date_to.value,
    //   source_of_member: controls.source_of_member.value
    //     ? controls.source_of_member.value.toLowerCase()
    //     : null,
    //   download_list: false,
    //   fetch_count: true,
    //   search_query: null,
    //   group_id: controls.group_id.value
    // };
    reqData = {
      ...reqData,
      ...{
        download_list: false,
        fetch_count: true,
        search_query: null,
      },
    };
    this.setState({
      isLoading: true,
    });
    CampaignService.getCustomiseCustomer(reqData)
      .then((res) => {
        if (res.data.data.total_customer === 0) {
          const err =
            "There is no customer found with applied filter . Please change filter criteria";
          const message = err;
          ModalService.openAlert("", message, "error");
          this.setState({
            total_custom_customer_count: res.data.data.total_customer,
            errorLength: false,
            isLoading: false,
          });
          return;
        }
        if (res.data && res.data.data && res.data.data.total_customer) {
          this.setState({
            total_custom_customer_count: res.data.data.total_customer,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  getTime = (time) => {
    this.setState({
      time: time,
      errorTime: false,
    });
  };

  openmsg_detail = (val) => {
    this.setState({
      msg_detail: val,
    });
  };

  resetControls = () => {
    const { controls } = this.state;
    controls["customer_target_type"].value = "all";
    controls["customerIds"].value = "";
    controls["language"].value = "english";
    controls["image_url"].value = null;
    controls["from_date"].value = null;
    controls["to_date"].value = null;
    controls["sms_draft"].value = null;
    controls["purpose_id"].value = null;
    controls["service_id"].value = null;
    controls["campaign_id"].value = null;
    controls["festival_id"].value = null;
    controls["source_of_member"].value = null;
    controls["message_type"].value = "simple";
    controls["is_scheduled"].value = false;
    controls["purpose_name"].value = "";
    controls["campaign_name"].value = "";
    controls["is_picture_sms"].value = false;
    controls["sms_credit_used"].value = "";
    controls["notification_title"].value = "";
    controls["communication_type"].value = "sms";
    this.setState({ controls });
  };

  applyFilterManualData = (e) => {
    let { controls } = this.state;
    controls["customer_target_type"].value = "custom";
    controls["custom_filter_type"].value = "manual";
    controls["custom_filter_manual_customer"].value = e ? e : [];
    this.setState({
      total_custom_customer_count: e.length,
      controls,
    });

    this.openManualDataFilter(false);
  };

  openPreviewImageLightBox = (image) => {
    const imagesToPreview = [image];
    this.setState({ isPreviewImageLightBoxOpen: true, imagesToPreview });
  };

  closePreviewImageLightBox = () => {
    const imagesToPreview = [];
    this.setState({ isPreviewImageLightBoxOpen: false, imagesToPreview });
  };

  setVehicleTypeTag = async () => {
    let vehicleType_index = this.TagsWithoutOffer.findIndex(
      (x) => x === "#VehicleType"
    );
    if (vehicleType_index <= -1) {
      this.TagsWithoutOffer.push("#VehicleType");
    }
    await this.setState(
      (prevState) => {
        return {
          ...prevState,
        };
      },
      () => {
        this.onChangeSMSContent({
          target: { value: this.state.controls["sms_draft"].value },
        });
      }
    );
  };

  setServiceTag = async () => {
    let service_index = this.TagsWithoutOffer.findIndex((x) => x === "#Service");
    if (service_index <= -1) {
      this.TagsWithoutOffer.push("#Service");
    }
    await this.setState(
      (prevState) => {
        return {
          ...prevState,
        };
      },
      () => {
        this.onChangeSMSContent({
          target: { value: this.state.controls["sms_draft"].value },
        });
      }
    );
  };

  removeVehicleTypeTag = async () => {
    let vehicleType_index = this.TagsWithoutOffer.findIndex(
      (x) => x === "#VehicleType"
    );
    if (vehicleType_index > -1) {
      this.TagsWithoutOffer.splice(vehicleType_index, 1);
    }
    await this.setState(
      (prevState) => {
        return {
          ...prevState,
        };
      },
      () => {
        this.onChangeSMSContent({
          target: { value: this.state.controls["sms_draft"].value },
        });
      }
    );
  };

  removeServiceTag = async () => {
    let service_index = this.TagsWithoutOffer.findIndex((x) => x === "#Service");
    if (service_index > -1) {
      this.TagsWithoutOffer.splice(service_index, 1);
    }
    await this.setState(
      (prevState) => {
        return {
          ...prevState,
        };
      },
      () => {
        this.onChangeSMSContent({
          target: { value: this.state.controls["sms_draft"].value },
        });
      }
    );
  };

  render() {
    const {
      controls,
      purpose,
      service,
      festival,
      isPreviewImageLightBoxOpen,
      imagesToPreview,
      festivalTabClicked,
      total_customer,
      selectServiceClicked,
      total_custom_customer_count,
      // whatsAppFilterData,
      Show_entermsgcontent,
      // showTime,
    } = this.state;
    const {
      message_type,
      language,
      is_scheduled,
      // started_at,
      customer_target_type,
      communication_type,
    } = controls;
    const mappleConfig = {
      direction: "bottom",
      backgroundColor: "white",
      float: false,
    };
    routUrl =
      window.location.href &&
      window.location.href.split("/")[5] &&
      window.location.href.split("/")[5];
    if (routUrl === "schedule") {
      controls["is_scheduled"].value = true;
    }

    if (this.state.controls.sms_draft.value) {
      let image_url;
      let urlRegex = /(https?:\/\/[^ ]*)/;
      let urls = this.state.controls.sms_draft.value.match(urlRegex);
      if (urls && urls[1]) {
        image_url = urls[1];
      }
    }
    let photoIndex = 0;

    return (
      <Fragment>
        {this.state.isLoading && <CustomSpinner />}
        {isPreviewImageLightBoxOpen && (
          <Lightbox
            mainSrc={imagesToPreview[photoIndex]}
            nextSrc={0}
            prevSrc={0}
            onCloseRequest={this.closePreviewImageLightBox}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + imagesToPreview.length - 1) %
                  imagesToPreview.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % imagesToPreview.length,
              })
            }
          />
        )}
        <Row id="CreateCampaign">
          {this.state.openJkUserFilter && (
            <Sidebar
              sidebar={
                <CampaignHoUserFilter
                  closeSideBar={this.onClickJkUser}
                  jkUserFilterData={
                    this.state.jkUserFilterData
                      ? this.state.jkUserFilterData
                      : {}
                  }
                  applyFilter={this.applyFilterJkUser}
                  ref={this.childCampaignHoUserFilter}
                  communication_type={
                    this.state.controls.communication_type.value
                  }
                />
              }
              open={this.state.openJkUserFilter}
              sidebarClassName="subsdiaries-sidebar"
              pullRight
              styles={{
                sidebar: { background: "white", height: "100%", width: "51%" },
              }}
            />
          )}
          {(this.state.openCampaignSecondaryUserFilter || this.state.openPromotionalEventsUsers) && (
            <Sidebar
              sidebar={
                <CampaignFilter

                  closeSideBar={this.onClickSecondaryUserFilter}
                  closeSideBarPromotional={this.onClickPromotionalEventsUsers}
                  closeSideBarCIP={this.onClickCIPEventsUsers}

                  filterType={this.state.filterType}
                  jkSecondaryUserFilterData={
                    this.state.jkSecondaryUserFilterData
                      ? this.state.jkSecondaryUserFilterData
                      : {}
                  }
                  jkPromotionalEventsUsersData={
                    this.state.jkPromotionalEventsUsersData
                      ? this.state.jkPromotionalEventsUsersData
                      : {}
                  }
                  applyFilterCIPUserFilter={
                    this.state.applyFilterCIPUserFilter
                      ? this.state.applyFilterCIPUserFilter
                      : {}
                  }

                  applyFilter={this.applyFilterjkSecondaryUserFilter}
                  applyFilterPromotional={this.applyFilterjkPromotionalEventsUsersData}
                  applyFilterCIP={this.applyFilterCIPUserFilter}

                  // ref={this.childCampaignSecondaryUserFilter}
                  ref={this.childPromotionalEventsUsers}
                />
              }
              open={this.state.openCampaignSecondaryUserFilter}
              sidebarClassName="subsdiaries-sidebar"
              pullRight
              styles={{
                sidebar: { background: "white", height: "100%", width: "51%" },
              }}
            />
          )}
          {/* {this.state.openCampaignSecondaryUserFilter && (
            <Sidebar
              sidebar={
                <CampaignSecondaryUserFilter
                  closeSideBar={this.onClickSecondaryUserFilter}
                  jkSecondaryUserFilterData={
                    this.state.jkSecondaryUserFilterData
                      ? this.state.jkSecondaryUserFilterData
                      : {}
                  }
                  applyFilter={this.applyFilterjkSecondaryUserFilter}
                  ref={this.childCampaignSecondaryUserFilter}
                />
              }
              open={this.state.openCampaignSecondaryUserFilter}
              sidebarClassName="subsdiaries-sidebar"
              pullRight
              styles={{
                sidebar: { background: "white", height: "100%", width: "51%" }
              }}
            />
          )} */}
          {/* {this.state.openPromotionalEventsUsers && (
            <Sidebar
              sidebar={
                <PromotionalEventsUsers
                  closeSideBar={this.onClickPromotionalEventsUsers}
                  jkPromotionalEventsUsersData={
                    this.state.jkPromotionalEventsUsersData
                      ? this.state.jkPromotionalEventsUsersData
                      : {}
                  }
                  applyFilter={this.applyFilterjkPromotionalEventsUsersData}
                  ref={this.childPromotionalEventsUsers}
                />
              }
              open={this.state.openPromotionalEventsUsers}
              sidebarClassName="subsdiaries-sidebar"
              pullRight
              styles={{
                sidebar: { background: "white", height: "100%", width: "51%" },
              }}
            />
          )}*/}
          {this.state.openWhatsappEventsUsers && (
            <Sidebar
              sidebar={
                <WhatsappEventsUsers
                  closeSideBar={this.onClickWhatsAppEventsUsers}
                  whatsAppFilterData={
                    this.state.whatsAppFilterData
                      ? this.state.whatsAppFilterData
                      : {}
                  }
                  applyFilter={this.applyFilterwhatsAppFilterData}
                  ref={this.childPromotionalEventsUsers}
                />
              }
              open={this.state.openWhatsappEventsUsers}
              sidebarClassName="subsdiaries-sidebar"
              pullRight
              styles={{
                sidebar: { background: "white", height: "100%", width: "51%" },
              }}
            />
          )}

          {this.state.openManualDataFilter && (
            <Sidebar
              sidebar={
                <ManualDataPmFilter
                  closeSideBar={() => this.openManualDataFilter(false)}
                  ManualDataFilter={
                    this.state.controls.custom_filter_manual_customer
                      ? this.state.controls.custom_filter_manual_customer.value
                      : []
                  }
                  applyFilter={this.applyFilterManualData}
                />
              }
              open={this.state.openManualDataFilter}
              sidebarClassName="subsdiaries-sidebar"
              pullRight
              styles={{
                sidebar: { background: "white", height: "100%", width: "51%" },
              }}
            />
          )}
          <Card className="w-100">
            <CardBody>
              <Row>
                {!this.props.CampaignDetailData.isEdit &&
                  !this.props.CampaignDetailData.isDuplicate ? (
                  <Col sm="6" className="Create-New-Campaign">
                    CREATE NEW CAMPAIGN
                  </Col>
                ) : (
                  <Col sm="6" className="Create-New-Campaign">
                    {this.props.CampaignDetailData.isEdit ? (
                      this.props.CampaignDetailData.isDuplicate ? (
                        !this.props.CampaignDetailData.isEdit &&
                        !this.props.CampaignDetailData.isDuplicate(
                          <Col sm="6" className="Create-New-Campaign">
                            CREATE NEW CAMPAIGN
                          </Col>
                        )
                      ) : (
                        <Col sm="10" className="Create-New-Campaign">
                          EDIT CAMPAIGN
                        </Col>
                      )
                    ) : (
                      <Col
                        sm="10"
                        className="Create-New-Campaign"
                        style={{ paddingLeft: "0px" }}
                      >
                        DUPLICATE CAMPAIGN
                      </Col>
                    )}
                  </Col>
                )}
              </Row>
              <hr />
              <Row>
                {!this.state.isHoLogin && (
                  <Col xl="4" md="12" xs="12">
                    <FormGroup>
                      <Label for="username">
                        Select Purpose<span className="required-field">*</span>
                      </Label>
                      <select
                        htmlFor="username"
                        onChange={this.handleChangeInput}
                        name="purpose_id"
                        id="purpose_id"
                        disabled={
                          this.props.CampaignDetailData.isEdit ||
                          this.props.CampaignDetailData.isDuplicate
                        }
                        value={this.state.controls.purpose_id.value}
                        className={
                          this.state.tooltipOpen &&
                            this.state.tooltip_name === "purpose_id"
                            ? "dropbox w-100 box-shadow-40px-0-5"
                            : "dropbox w-100"
                        }
                      >
                        <option value="" defaultChecked>
                          Select
                        </option>
                        {Object.keys(purpose).map((i) => (
                          <option
                            value={purpose[i].purpose_id}
                            key={purpose[i].name}
                            msg={purpose[i].sms_draft}
                          >
                            {purpose[i].name}
                          </option>
                        ))}
                      </select>
                      <UncontrolledPopover
                        placement={"right-start"}
                        hideArrow={false}
                        isOpen={
                          this.state.tooltipOpen &&
                          this.state.tooltip_name === "purpose_id"
                        }
                        fade={true}
                        target={"purpose_id"}
                        trigger="focus"
                        className="create-campaign-tooltip"
                      >
                        <div ref={(r) => (this.dealerPopOver = r)}>
                          <PopoverHeader className="popover-title d-flex justify-content-between">
                            <span>Help Guide Tour</span>
                            <span>1/9</span>
                          </PopoverHeader>
                          <PopoverBody className="d-flex-column">
                            <span className="popover-lbl mt-2">
                              Select The Purpose of the campaign
                            </span>
                            <span className="popover-lbl-value mt-2">
                              Example Festive Wishes, Tyre Service Due etc.
                              <br />
                              This will help in identifying the particular SMS
                              template and appropriate SMS texts will be
                              displayed in the "Enter Message Text" box below.
                            </span>
                            <br />
                            {
                              <div className="d-flex-row justify-content-end mb-2">
                                <span
                                  className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                  onClick={() =>
                                    this.setState({
                                      tooltipOpen: true,
                                      tooltip_name: "campaign_name",
                                    })
                                  }
                                >
                                  Next
                                </span>
                              </div>
                            }
                          </PopoverBody>
                        </div>
                      </UncontrolledPopover>
                      {controls.purpose_id.showErrorMsg && (
                        <div className="error">
                          *Please select purpose of the Campaign.
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                )}
                {festivalTabClicked ? (
                  <Col xl="4" md="12" xs="12">
                    <FormGroup>
                      <Label for="username">Select Festival</Label>
                      <select
                        htmlFor="username"
                        className="dropbox w-100"
                        onChange={this.handleChangeInput}
                        name="festival_id"
                        value={controls.festival_id.value}
                      >
                        <option value="select" defaultChecked>
                          Select
                        </option>
                        {Object.keys(festival).map((i) => (
                          <option
                            value={festival[i].festival_id}
                            key={festival[i].festival_id}
                            festname={festival[i].name}
                            msg={festival[i].sms_draft}
                          >
                            {festival[i].festival_name}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                ) : (
                  ""
                )}
                {selectServiceClicked ? (
                  <Col xl="4" md="12" xs="12">
                    <FormGroup>
                      <Label for="username">Select Service</Label>
                      <select
                        htmlFor="username"
                        className="dropbox w-100"
                        onChange={this.handleChangeInput}
                        name="service_id"
                        value={controls.service_id.value}
                      >
                        <option value="select" defaultChecked>
                          Select
                        </option>
                        {Object.keys(service).map((i) => (
                          <option
                            value={service[i].service_id}
                            key={i}
                            msg={service[i].sms_draft}
                          >
                            {service[i].service_name}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                ) : (
                  ""
                )}

                <Col xl="4" md="12" xs="12" id="campaign_name">
                  <FormGroup>
                    <Label for="campaign_name">
                      Campaign Name<span className="required-field">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="campaign_name"
                      placeholder="Type here"
                      onChange={this.handleChangeInput}
                      value={controls.campaign_name.value}
                      id="campaign_name"
                      className={
                        this.state.tooltipOpen &&
                          this.state.tooltip_name === "campaign_name"
                          ? "box-shadow-40px-0-5"
                          : ""
                      }
                    />
                    <UncontrolledPopover
                      placement={"right-start"}
                      hideArrow={false}
                      isOpen={
                        this.state.tooltipOpen &&
                        this.state.tooltip_name === "campaign_name"
                      }
                      fade={true}
                      target={"campaign_name"}
                      trigger="focus"
                      className="create-campaign-tooltip"
                    >
                      <div ref={(r) => (this.dealerPopOver = r)}>
                        <PopoverHeader className="popover-title d-flex justify-content-between">
                          <span>Help Guide Tour</span>
                          <span>2/9</span>
                        </PopoverHeader>
                        <PopoverBody className="d-flex-column">
                          <span className="popover-lbl mt-2">
                            Campaign Name
                          </span>
                          <span className="popover-lbl-value mt-2">
                            Provide the unique campaign name to identify the
                            campaign
                            <br />
                            Example: Elanzo Touring Promotion for PCR service
                            customer or Diwali wishes
                            <br />
                            <br />
                            This will also help in rerun the campaign.
                          </span>
                          <br />
                          {
                            <div className="d-flex-row justify-content-between mb-2">
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "purpose_id",
                                  })
                                }
                              >
                                Previous
                              </span>
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "customer_target",
                                  })
                                }
                              >
                                Next
                              </span>
                            </div>
                          }
                        </PopoverBody>
                      </div>
                    </UncontrolledPopover>
                    {controls.campaign_name.showErrorMsg && (
                      <div className="error">*Please enter campaign name.</div>
                    )}
                  </FormGroup>
                </Col>
                {
                  this.state.userDetail.sap_id === "trackwalkins.pm@jkmail.com" && (
                    <Col xl="4" md="12" xs="12" id="campaign_name">
                      <FormGroup>
                        <Label for="campaign_name">
                          Template I'd
                        </Label>
                        <Input
                          type="tel"
                          name="pm_trackwalkins_template_id"
                          placeholder="Type here"
                          onChange={this.handleTemplateIdChange}
                          value={this.state.template_id}
                          id="pm_trackwalkins_template_id"
                        />
                      </FormGroup>
                    </Col>
                  )
                }
              </Row>
              <Row
                id="customer_target"
                className={
                  this.state.tooltipOpen &&
                    this.state.tooltip_name === "customer_target"
                    ? "margin-top-10 ml-0 box-shadow-40px-0-5"
                    : "margin-top-10 ml-0"
                }
              >
                <div className="radio-main-lbl w-100">
                  Customer Target Group
                </div>
                {this.state.userDetail &&
                  this.state.userDetail.type &&
                  (this.state.userDetail.type === Roles.HEAD_OFFICE_ROLE ||
                    this.state.userDetail.type === Roles.PROJECT_MANAGER_ROLE) ? (
                  <Col xs="12" md="12" xl="12" className="mt-2 pl-0">
                    <label
                      onClick={() => this.onClickJkUser(true)}
                      className={
                        "container" +
                        (controls.customer_target_type.value === "jk_user"
                          ? " font-bold "
                          : "")
                      }
                    >
                      JK User{" "}
                      {(controls.customer_target_type.value === "jk_user" &&
                        total_custom_customer_count) ||
                        (total_custom_customer_count === 0 || total_custom_customer_count === '0') ? (
                        <span className="color-blue">
                          {" "}
                          {total_custom_customer_count
                            ? "(" + total_custom_customer_count + ")"
                            : ""}
                        </span>
                      ) : (
                        ""
                      )}
                      <input
                        type="radio"
                        name="customer_target_type"
                        value="jk_user"
                        checked={
                          controls.customer_target_type.value === "jk_user"
                        }
                        onChange={this.handleChangeInput}
                      />
                      <span className="checkmark" />
                    </label>

                    <span
                      onClick={controls.customer_target_type.value === 'jk_secondary_point' ? this.onClickSecondaryUserFilter :
                        controls.customer_target_type.value === 'jk_promotion_and_services' ? this.onClickPromotionalEventsUsers :
                          controls.customer_target_type.value === 'jk_cip_user' ? this.onClickCIPEventsUsers :
                            this.onClickSecondaryUserFilter}
                    // onClick={this.onClickSecondaryUserFilter}
                    >
                      <label
                        className={
                          "container" +
                          ((controls.customer_target_type.value ===
                            "jk_secondary_point" || controls.customer_target_type.value ===
                            "jk_promotion_and_services" || controls.customer_target_type.value === 'jk_cip_user')
                            ? " font-bold "
                            : "")
                        }
                      >
                        JK Secondary User
                        {((controls.customer_target_type.value ===
                          "jk_secondary_point" || controls.customer_target_type.value ===
                          "jk_promotion_and_services" || controls.customer_target_type.value === 'jk_cip_user') &&
                          total_custom_customer_count) ||
                          (total_custom_customer_count === 0 || total_custom_customer_count === '0') ? (
                          <span className="color-blue">
                            {" "}
                            {total_custom_customer_count
                              ? "(" + total_custom_customer_count + ")"
                              : ""}
                          </span>
                        ) : (
                          ""
                        )}
                        <input
                          type="radio"
                          name="customer_target_type"
                          value="jk_user"
                          checked={
                            (controls.customer_target_type.value ===
                              "jk_secondary_point" || controls.customer_target_type.value ===
                              "jk_promotion_and_services" || controls.customer_target_type.value === 'jk_cip_user')
                          }
                        />
                        <span className="checkmark" />
                      </label>
                    </span>
                    {/* <span onClick={this.onClickPromotionalEventsUsers}>
                        <label
                          className={
                            "container" +
                            (controls.customer_target_type.value ==
                              "jk_promotion_and_services"
                              ? " font-bold "
                              : "")
                          }
                        >
                          Promotional & Events Users
                        {(controls.customer_target_type.value ==
                            "jk_promotion_and_services" &&
                            total_custom_customer_count) ||
                            total_custom_customer_count === 0 ? (
                              <span className="color-blue">
                                {" "}
                                {total_custom_customer_count
                                  ? "(" + total_custom_customer_count + ")"
                                  : ""}
                              </span>
                            ) : (
                              ""
                            )}
                          <input
                            type="radio"
                            name="customer_target_type"
                            value="jk_promotion_and_services"
                            checked={
                              controls.customer_target_type.value ==
                              "jk_promotion_and_services"
                            }
                          />
                          <span className="checkmark" />
                        </label>

                      </span> */}
                    {
                      this.state.userDetail.sap_id ===
                      "trackwalkins.pm@jkmail.com" && (
                        <span onClick={this.onClickWhatsAppEventsUsers}>
                          <label
                            className={
                              "container" +
                              (controls.customer_target_type.value ===
                                "whatsapp"
                                ? " font-bold "
                                : "")
                            }
                          >
                            WhatsApp
                            <input
                              type="radio"
                              name="customer_target_type"
                              value="whatsapp"
                              checked={
                                controls.customer_target_type.value === "whatsapp"
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </span>
                      )}
                    {this.state.userDetail.sap_id ===
                      "trackwalkins.pm@jkmail.com" && (
                        <span onClick={() => this.openManualDataFilter(true)}>
                          <label
                            className={
                              "container" +
                              (controls.customer_target_type.value === "custom"
                                ? " font-bold "
                                : "")
                            }
                          >
                            Manual Data
                            {(controls.customer_target_type.value === "custom" &&
                              total_custom_customer_count) ||
                              (total_custom_customer_count === 0 || total_custom_customer_count === '0') ? (
                              <span className="color-blue">
                                {" "}
                                {total_custom_customer_count
                                  ? "(" + total_custom_customer_count + ")"
                                  : ""}
                              </span>
                            ) : (
                              ""
                            )}
                            <input
                              type="radio"
                              name="custom"
                              value="custom"
                              checked={
                                controls.customer_target_type.value === "custom"
                              }
                            />
                            <span className="checkmark" />
                          </label>
                        </span>
                      )}
                  </Col>
                ) : (
                  <Col className="mt-2 pl-0">
                    <label
                      className={
                        "container" +
                        (controls.customer_target_type.value === "all"
                          ? " font-bold "
                          : "")
                      }
                    >
                      All
                      <span className="color-blue">
                        {" "}
                        ({total_customer ? total_customer : 0})
                      </span>
                      <input
                        type="radio"
                        name="customer_target_type"
                        value="all"
                        checked={
                          customer_target_type.value
                            ? customer_target_type.value
                            : (customer_target_type.value = "all")
                        }
                        onChange={this.handleChangeInput}
                      />
                      <span className="checkmark" />
                    </label>
                    <span onClick={this.onClickCustomise}>
                      <label
                        className={
                          "container" +
                          (controls.customer_target_type.value === "custom"
                            ? " font-bold "
                            : "")
                        }
                      >
                        Customize
                        <span className="color-blue">
                          {" "}
                          {total_custom_customer_count ||
                            total_custom_customer_count === 0 ? (
                            <b>({total_custom_customer_count})</b>
                          ) : (
                            ""
                          )}
                        </span>
                        <input
                          type="radio"
                          name="customer_target_type"
                          value="custom"
                          checked={
                            controls.customer_target_type.value === "custom"
                          }
                        />
                        <span className="checkmark" />
                      </label>
                    </span>
                  </Col>
                )}
                <UncontrolledPopover
                  placement={"right-start"}
                  hideArrow={false}
                  isOpen={
                    this.state.tooltipOpen &&
                    this.state.tooltip_name === "customer_target"
                  }
                  fade={true}
                  target={"customer_target"}
                  trigger="focus"
                  className="create-campaign-tooltip"
                >
                  <div ref={(r) => (this.dealerPopOver = r)}>
                    <PopoverHeader className="popover-title d-flex justify-content-between">
                      <span>Help Guide Tour</span>
                      <span>3/9</span>
                    </PopoverHeader>
                    <PopoverBody className="d-flex-column">
                      <span className="popover-lbl mt-2">
                        Target Audience for the campaign
                      </span>
                      <span className="popover-lbl-value mt-2">
                        Every campaign may have the different target audience
                        <br />
                        Example: Diwali Wishes are for all customers but
                        promotion of alignment service, might be for PCR
                        customers only.
                        <br />
                        <br />
                        So select proper target audience. Select custom to
                        filter the precise target audience for the campaign
                      </span>
                      <br />
                      {
                        <div className="d-flex-row justify-content-between mb-2">
                          <span
                            className="link-blue cursor-pointer font-size-14px font-weight-bold"
                            onClick={() =>
                              this.setState({
                                tooltipOpen: true,
                                tooltip_name: "campaign_name",
                              })
                            }
                          >
                            Previous
                          </span>
                          <span
                            className="link-blue cursor-pointer font-size-14px font-weight-bold"
                            onClick={() =>
                              this.setState({
                                tooltipOpen: true,
                                tooltip_name: "SMS_type",
                              })
                            }
                          >
                            Next
                          </span>
                        </div>
                      }
                    </PopoverBody>
                  </div>
                </UncontrolledPopover>
              </Row>

              {/* ========================================== For Push Notification Only =============================== */}

              {(controls.customer_target_type.value === "jk_user" ||
                controls.customer_target_type.value === "whatsapp") &&
                this.state.userDetail.sap_id ===
                "trackwalkins.pm@jkmail.com" && (
                  <Row className="margin-top-10">
                    <Col sm="8">
                      <div className="margin-bottom-10 radio-main-lbl">
                        Select Communication Type
                      </div>
                      <div className="d-flex-row">
                        {controls.customer_target_type.value === "jk_user" && (
                          <>
                            {" "}
                            <label
                              className={
                                "container" +
                                (communication_type.value === "sms"
                                  ? " font-bold "
                                  : "")
                              }
                              style={{ width: "105px" }}
                            >
                              Message
                              <input
                                type="radio"
                                name="communication_type"
                                value="sms"
                                checked={communication_type.value === "sms"}
                                onChange={this.handleChangeInput}
                              />
                              <span className="checkmark" />
                            </label>
                            <label
                              className={
                                "container" +
                                (communication_type.value === "notification"
                                  ? " font-bold "
                                  : "")
                              }
                            >
                              Push Notification
                              <input
                                type="radio"
                                name="communication_type"
                                value="notification"
                                checked={
                                  communication_type.value === "notification"
                                }
                                onChange={this.handleChangeInput}
                              />
                              <span className="checkmark" />
                            </label>
                          </>
                        )}
                        <label
                          className={
                            "container" +
                            (communication_type.value === "whatsapp"
                              ? " font-bold "
                              : "")
                          }
                        >
                          WhatsApp
                          <input
                            type="radio"
                            name="communication_type"
                            value="whatsapp"
                            checked={communication_type.value === "whatsapp"}
                            onChange={this.handleChangeInput}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      {communication_type.value === "notification" && (
                        <div className="notification-text">
                          *Note : We will send push notification to only users
                          who have given push notification permission.
                        </div>
                      )}
                    </Col>
                  </Row>
                )}
              {/* ========================================== For Push Notification  End =============================== */}

              <Row className="margin-top-10">
                <Col
                  sm={communication_type.value === "notification" ? 4 : 3}
                  id="SMS_type"
                  className={
                    this.state.tooltipOpen &&
                      this.state.tooltip_name === "SMS_type"
                      ? "box-shadow-40px-0-5"
                      : ""
                  }
                >
                  <div className="margin-bottom-10 radio-main-lbl">
                    {communication_type.value === "notification"
                      ? "Select Push Notification Type"
                      : " Select Message Type"}
                  </div>
                  <div className="d-flex-row">
                    <label
                      className={
                        "container" +
                        (message_type.value === "simple" ? " font-bold " : "")
                      }
                    >
                      Simple
                      <input
                        type="radio"
                        name="message_type"
                        value="simple"
                        checked={message_type.value === "simple"}
                        onChange={this.handleChangeInput}
                      />
                      <span className="checkmark" />
                    </label>
                    <label
                      className={
                        "container" +
                        (message_type.value === "picture" ? " font-bold " : "")
                      }
                    >
                      Picture
                      <input
                        type="radio"
                        name="message_type"
                        value="picture"
                        checked={message_type.value === "picture"}
                        onChange={this.handleChangeInput}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  {controls.image_url.showErrorMsg && (
                    <div className="error">*Please select Image.</div>
                  )}
                  <UncontrolledPopover
                    placement={"right-start"}
                    hideArrow={false}
                    isOpen={
                      this.state.tooltipOpen &&
                      this.state.tooltip_name === "SMS_type"
                    }
                    fade={true}
                    target={"SMS_type"}
                    trigger="focus"
                    className="create-campaign-tooltip"
                  >
                    <div ref={(r) => (this.dealerPopOver = r)}>
                      <PopoverHeader className="popover-title d-flex justify-content-between">
                        <span>Help Guide Tour</span>
                        <span>4/9</span>
                      </PopoverHeader>
                      <PopoverBody className="d-flex-column">
                        <span className="popover-lbl mt-2">SMS Type</span>
                        <span className="popover-lbl-value mt-2">
                          There are two type of SMS. <br />
                          Simple SMS: It is our regular text SMS
                          <br />
                          <br />
                          Picture SMS: If you want to share the picture along
                          with text, please select picture SMS. Upload the
                          image.
                          <br />A tiny link will be added at the end of the SMS
                          as the picture link
                        </span>
                        <br />
                        {
                          <div className="d-flex-row justify-content-between mb-2">
                            <span
                              className="link-blue cursor-pointer font-size-14px font-weight-bold"
                              onClick={() =>
                                this.setState({
                                  tooltipOpen: true,
                                  tooltip_name: "customer_target",
                                })
                              }
                            >
                              Previous
                            </span>
                            <span
                              className="link-blue cursor-pointer font-size-14px font-weight-bold"
                              onClick={() =>
                                this.setState({
                                  tooltipOpen: true,
                                  tooltip_name: "language_of_sms",
                                })
                              }
                            >
                              Next
                            </span>
                          </div>
                        }
                      </PopoverBody>
                    </div>
                  </UncontrolledPopover>
                </Col>
                <Col
                  id="image_url"
                  style={{
                    marginLeft:
                      communication_type.value === "notification"
                        ? "-45px"
                        // ? "-42px"
                        : "0px",
                    marginTop:
                      communication_type.value === "notification"
                        ? "0px"
                        : "0px",
                  }}
                >
                  {message_type.value === "picture" &&
                    controls.image_url.value ? (
                    <div style={{ marginLeft: "8px" }}>
                      <img
                        src={controls.image_url.value}
                        alt=''
                        className="picturedemo"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.selectPicture()}
                      />
                      <img
                        src="images/sidebar-icons/fill-1.png"
                        alt=''
                        onClick={() => this.selectPicture()}
                        srcSet="images/sidebar-icons/fill-1@2x.png 2x,
                      images/sidebar-icons/fill-1@3x.png 3x"
                        className="picturedit cursor-pointer"
                      />
                    </div>
                  ) : (
                    message_type.value === "picture" && (
                      <div
                        onClick={() => this.selectPicture()}
                        className="select-picture-wrapper"
                      >
                        <img
                          className="Select-Picture-img"
                          src="images/camera.svg"
                          alt=''
                        />
                        <span
                          className="Select-Picture"
                          style={{ cursor: "pointer" }}
                        >
                          Select Picture
                        </span>
                      </div>
                    )
                  )}
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => this.uploadFile(e)}
                    ref={(ref) => (this.fileInput = ref)}
                    style={{ display: "none" }}
                  />
                </Col>
                {controls.customer_target_type.value === "jk_user" &&
                  communication_type.value === "notification" && (
                    <Col
                      lg="6"
                      sm="6"
                      md="6"
                      xs="12"
                      className="d-flex-column"
                      style={{ marginTop: "-50px", height: "0px" }}
                    >
                      <span className="Preview-Message">Preview Message</span>
                      <div className="sms-previewNotification">
                        <div className="sms-content-preview">
                          <div
                            className="chatbox-wrapper"
                            style={{
                              marginTop: "27px",
                              backgroundColor: "white",
                              minHeight: "72px",
                              maxHeight: "72px",
                            }}
                          >
                            <div
                              className="chatbox-inner"
                              style={{
                                width:
                                  controls.image_url.value ||
                                    message_type.value === "picture"
                                    ? "200px"
                                    : "",
                                height: "57px",
                              }}
                            >
                              <div
                                className="scroll-container"
                                fxFlex="auto"
                                style={{ maxHeight: "45px" }}
                              >
                                <b>{controls.notification_title.value}</b>
                                <br />
                                {controls.sms_draft.value}
                                <br />
                              </div>
                            </div>
                          </div>
                          {message_type.value === "picture" && (
                            <span>
                              {controls.image_url.value ? (
                                <img
                                  src={controls.image_url.value}
                                  style={{
                                    height: "54px",
                                    paddingRight: "45px",
                                    position: "absolute",
                                    right: "0",
                                    marginTop: "-68px",
                                    maxWidth: "100px",
                                  }}
                                  onClick={() =>
                                    this.openPreviewImageLightBox(
                                      controls.image_url.value
                                    )
                                  }
                                  alt=''
                                />
                              ) : (
                                <img
                                  src="./image-placeholder.png"
                                  alt=''
                                  style={{
                                    height: "25px",
                                    paddingRight: "60px",
                                    position: "absolute",
                                    right: "0",
                                    marginTop: "-50px",
                                  }}
                                />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  )}
              </Row>

              <Row className="margin-top-10">
                {communication_type.value !== "notification" && (
                  <Col
                    sm="6"
                    id="language_of_sms"
                    className={
                      this.state.tooltipOpen &&
                        this.state.tooltip_name === "language_of_sms"
                        ? "box-shadow-40px-0-5"
                        : ""
                    }
                  >
                    <div className="margin-bottom-10 radio-main-lbl">
                      Select Language
                    </div>
                    <div className="d-linear">
                      <label
                        className={
                          "container" +
                          (this.state.controls.language.value === "english"
                            ? " font-bold "
                            : "")
                        }
                        style={{ width: "95px" }}
                      >
                        English
                        <input
                          type="radio"
                          name="language"
                          value="english"
                          checked={controls.language.value === "english"}
                          onChange={this.handleChangeInput}
                        />
                        <span className="checkmark" />
                      </label>
                      {/* <MappleToolTip>
                        <div>
                          Show Mapple Tip on this
                        </div>
                        <div>
                          Hey! this is damn easy
                        </div>
                      </MappleToolTip> */}
                      <MappleToolTip {...mappleConfig}>
                        <label
                          className={
                            "container" +
                            (language.value === "other" ? " font-bold " : "")
                          }
                          style={{ marginRight: "214px" }}
                        >
                          Other Language
                          <input
                            type="radio"
                            name="language"
                            value="other"
                            className="otherlang"
                            checked={language.value === "other"}
                            onChange={this.handleChangeInput}
                          />
                          <span className="checkmark" />
                        </label>
                        <div>
                          <Row className="otherlangcontent-wrapps">
                            <Col lg="10" sm="12" md="10" xs="12">
                              <div
                                className="otherlangcontent"
                                style={{ width: "100%" }}
                              >
                                <ul className="Enrollment-ul text-none">
                                  <li className="enroll-li campaign-popup-notes">
                                    One uni-code character (other language
                                    character) is equivalent to four English
                                    characters for text message sent in other
                                    language. So please check the SMS count
                                    before sending the SMS.
                                  </li>
                                  <li className="enroll-li campaign-popup-notes">
                                    The ability to read text messages in other
                                    languages depends on the receiver’s handset
                                    model (compatibility) and the mobile
                                    operators. You can type up to{" "}
                                    {this.state.maxCount} characters, if your
                                    text message is in another language.
                                  </li>
                                </ul>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </MappleToolTip>
                    </div>
                    <UncontrolledPopover
                      placement={"right-start"}
                      hideArrow={false}
                      isOpen={
                        this.state.tooltipOpen &&
                        this.state.tooltip_name === "language_of_sms"
                      }
                      fade={true}
                      target={"language_of_sms"}
                      trigger="focus"
                      className="create-campaign-tooltip"
                    >
                      <div ref={(r) => (this.dealerPopOver = r)}>
                        <PopoverHeader className="popover-title d-flex justify-content-between">
                          <span>Help Guide Tour</span>
                          <span>5/9</span>
                        </PopoverHeader>
                        <PopoverBody className="d-flex-column">
                          <span className="popover-lbl mt-2">
                            Language of SMS
                          </span>
                          <span className="popover-lbl-value mt-2">
                            SMS can be shared in English as well as multiple
                            regional languages like Hindi, Gujarati, Marathi,
                            Tamil, Telugu, Kannada, Bengali etc
                            <br />
                            If you are sharing SMS in English then it will work
                            as regular SMS and 160 characters is considered as 1
                            SMS. Click on the (i icon) for more details.
                            <br />
                            If you are sharing SMS in Regional language then it
                            will work as unicode SMS and 70 characters is
                            considered as 1 SMS. Click on the (i icon) for more
                            details.
                            <br />
                            For regional language, just copy the message from
                            respective regional language text editor and paste
                            in the Enter Message Text box below
                          </span>
                          <br />
                          {
                            <div className="d-flex-row justify-content-between mb-2">
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "SMS_type",
                                  })
                                }
                              >
                                Previous
                              </span>
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "message_box",
                                  })
                                }
                              >
                                Next
                              </span>
                            </div>
                          }
                        </PopoverBody>
                      </div>
                    </UncontrolledPopover>
                  </Col>
                )}
              </Row>
              <br />
              <br />
              {communication_type.value === "notification" && (
                <Row>
                  <Col lg="8" sm="8" md="8" xs="12">
                    <div className="margin-bottom-10">
                      <div className="d-flex">
                        <span className="lbl-campaign">Select Notification Action</span>
                        <span className="required-field">*</span>
                      </div>
                    </div>
                    <select
                      className="form-control select drop-down-control"
                      name="action"
                      value={controls.action.value}
                      onChange={(e) => this.handleChangeInput(e)}
                    >
                      {(this.state.actionOption).map((item) => (
                        <option className="text-capitalize" value={item.value}>{item.label}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
              )}
              <br />
              {communication_type.value === "notification" && (
                <Row>
                  <Col lg="8" sm="8" md="8" xs="12">
                    <div className="margin-bottom-10">
                      <div className="d-flex">
                        <span className="lbl-campaign">Notification Title</span>
                        <span className="required-field">*</span>
                      </div>
                    </div>
                    <TextAreaHighlight
                      className="inputbox-textarea-notificatiion-title"
                      name="notification_title"
                      value={controls.notification_title.value}
                      onKeyDown={this.handleChangeInput}
                      onChange={this.handleChangeInput}
                    />
                    {controls.notification_title.showErrorMsg && (
                      <div className="error text-none">
                        *Please enter notificatiion title.
                      </div>
                    )}
                  </Col>
                </Row>
              )}
              <br />
              <Row
                style={{
                  marginTop:
                    communication_type.value === "notification"
                      ? "0px"
                      : "-30px",
                }}
              >
                <Col lg="8" sm="8" md="8" xs="12" id="sms_draft">
                  <div>
                    <div
                      className="d-flex-row"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="margin-bottom-10">
                        <div className="d-flex">
                          <span className="lbl-campaign">
                            {communication_type.value === "notification"
                              ? "Enter Push Notification Text"
                              : " Enter Message Text"}
                          </span>
                          <span className="required-field">*</span>
                          <div className="contentdiv">
                            {communication_type.value !== "notification" && (
                              <img
                                style={{ marginTop: "-6px" }}
                                src="images/sidebar-icons/about-selected.svg"
                                alt=''
                                id="editorimage"
                                onClick={this.Show_entermsgcontent}
                              />
                            )}
                          </div>
                          {Show_entermsgcontent ? (
                            <OutsideClickHandler
                              onOutsideClick={this.close_entermsgcontent}
                            >
                              <Row>
                                <Col lg="10" sm="12" md="10" xs="12">
                                  <span
                                    className="closebtn"
                                    onClick={this.close_entermsgcontent}
                                  >
                                    X
                                  </span>
                                  <div className="entermsgcontent">
                                    <span className="One-uni-code-charact">
                                      <b className="Message-Details">
                                        Message Preview
                                      </b>

                                      <ul
                                        className="Enrollment-ul"
                                        style={{ marginBottom: "0" }}
                                      >
                                        <li className="enroll-li campaign-popup-notes">
                                          {/* Hello Sandeep Bhai! Here’s an offer for you!! Avail BUY 2 GET ANY 1 FREE at Soa and Salon. Hurry and take benefit of this offer. Offer valid till 21-11-2019. T&C applied. */}
                                          {this.state.tooltipText}
                                        </li>
                                        <li className="enroll-li campaign-popup-notes">
                                          Note - This message is a preview of
                                          the message that the customer will
                                          receive. The message characters and
                                          credits will vary as per the customer
                                          name and business name. Make sure you
                                          keep that in mind before sending the
                                          message to all customers.
                                        </li>
                                      </ul>
                                      <br />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            </OutsideClickHandler>
                          ) : (
                            ""
                          )}

                          {/* <div>
                          This is cool
                        </div> */}
                        </div>
                        <div className="entermsgcontent-wrapp">
                          <Row>
                            <Col lg="10" sm="12" md="10" xs="12">
                              <div className="entermsgcontent">
                                <span className="One-uni-code-charact">
                                  <b>Message Preview</b>
                                  <ul className="Enrollment-ul text-none">
                                    <li className="enroll-li campaign-popup-notes">
                                      {/* Hello Sandeep Bhai! Here’s an offer for you!! Avail BUY 2 GET ANY 1 FREE at Soa and Salon. Hurry and take benefit of this offer. Offer valid till 21-11-2019. T&C applied. */}
                                      {this.state.tooltipText}
                                    </li>
                                    <li className="enroll-li campaign-popup-notes text-none">
                                      Note - This message is a preview of the
                                      message that the customer will receive.
                                      The message characters and credits will
                                      vary as per the customer name and offer.
                                      Make sure you keep that in mind before
                                      sending the message to all customers.
                                    </li>
                                  </ul>
                                  <b>Message Details</b>
                                  <br />
                                  <ul className="Enrollment-ul text-none">
                                    <li className="enroll-li campaign-popup-notes">
                                      A message with upto 160 characters
                                      (including space and special characters)
                                      uses 1 SMS credit(balance).
                                    </li>
                                    <li className="enroll-li campaign-popup-notes">
                                      If the message is more than 160
                                      characters, 2 SMS credits are used for
                                      that message. Meaning the account balance
                                      is debited by 2 SMS.
                                    </li>
                                    <li className="enroll-li campaign-popup-notes">
                                      Maximum eligible limit per message is{" "}
                                      {this.state.maxCount}
                                      characters.
                                    </li>
                                    <li className="enroll-li campaign-popup-notes">
                                      Only English language messages are
                                      eligible as of now. Walkins does not
                                      support unicode messages (Indian language
                                      messages).
                                    </li>
                                  </ul>
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      {communication_type.value !== "notification" && (
                        <span className="Message-Credits-Used">
                          Message Credits Used:
                          {this.state.smsConfig.smsContentCredit}
                          <img
                            src="images/sidebar-icons/about-selected.svg"
                            alt=''
                            id="editorimage"
                            onClick={() => this.openmsg_detail(true)}
                          />
                          {this.state.msg_detail ? (
                            <OutsideClickHandler
                              onOutsideClick={() => this.openmsg_detail(false)}
                            >
                              <Row>
                                <Col lg="10" sm="12" md="10" xs="12">
                                  <span
                                    className="closebtn ml-auto"
                                    onClick={() => this.openmsg_detail(false)}
                                  >
                                    X
                                  </span>
                                  <div className="entermsgcontent">
                                    <span className="One-uni-code-charact">
                                      <b className="Message-Details">
                                        Message Details
                                      </b>
                                      <br />
                                      <ul
                                        className="Enrollment-ul text-none"
                                        style={{ marginBottom: "0" }}
                                      >
                                        <li className="enroll-li campaign-popup-notes">
                                          A message with upto{" "}
                                          {language.value === "english"
                                            ? 160
                                            : 70}{" "}
                                          characters (including space and
                                          special characters) uses 1 SMS
                                          credit(balance).
                                        </li>
                                        <li className="enroll-li campaign-popup-notes">
                                          If the message is more than{" "}
                                          {language.value === "english"
                                            ? 160
                                            : 70}{" "}
                                          characters, 2 SMS credits are used for
                                          that message. Meaning the account
                                          balance is debited by 2 SMS.
                                        </li>
                                        <li className="enroll-li campaign-popup-notes">
                                          Maximum eligible limit per message is{" "}
                                          {this.state.maxCount} characters.
                                        </li>
                                        <li className="enroll-li campaign-popup-notes">
                                          Only English language messages are
                                          eligible as of now. JKTYRE does not
                                          support unicode messages (Indian
                                          language messages).
                                        </li>
                                      </ul>
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            </OutsideClickHandler>
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    </div>
                    <TextAreaHighlight
                      id="message_box"
                      className={
                        this.state.tooltipOpen &&
                          this.state.tooltip_name === "message_box"
                          ? "inputbox-textarea box-shadow-40px-0-5"
                          : "inputbox-textarea"
                      }
                      value={controls.sms_draft.value}
                      onKeyDown={this.onSmsDraftKeyDown}
                      onChange={this.onChangeSMSContent}
                      ref={(r) => (this.refTextAreaHighlight = r)}
                      highlight={() => this.state.highLightTag}
                    />
                    <UncontrolledPopover
                      placement={"right-start"}
                      hideArrow={false}
                      isOpen={
                        this.state.tooltipOpen &&
                        this.state.tooltip_name === "message_box"
                      }
                      fade={true}
                      target={"message_box"}
                      trigger="focus"
                      className="create-campaign-tooltip"
                    >
                      <div ref={(r) => (this.dealerPopOver = r)}>
                        <PopoverHeader className="popover-title d-flex justify-content-between">
                          <span>Help Guide Tour</span>
                          <span>6/9</span>
                        </PopoverHeader>
                        <PopoverBody className="d-flex-column">
                          <span className="popover-lbl mt-2">
                            Message Box or Text Box
                          </span>
                          <span className="popover-lbl-value mt-2">
                            Please type in your message here.
                            <br />
                            Based on the "Campaign Purpose" automated SMS text
                            (template) displays here. Still you can edit here
                            <br />
                            At the bottom, you will find few variables,
                            available for the campaign
                            <br />
                            Example #CustomerName, meaning in SMS text, where
                            this keyword is used, a respective customer name
                            from database will be taken. Means all customers
                            will receive personalized SMS. Like Dear Gaurav,
                            Dear Taral etc.
                          </span>
                          <br />
                          {
                            <div className="d-flex-row justify-content-between mb-2">
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "language_of_sms",
                                  })
                                }
                              >
                                Previous
                              </span>
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "schedule_campaign",
                                  })
                                }
                              >
                                Next
                              </span>
                            </div>
                          }
                        </PopoverBody>
                      </div>
                    </UncontrolledPopover>
                    {controls.sms_draft.showErrorMsg && (
                      <div className="error text-none">
                        *Please enter{" "}
                        {communication_type.value === "notification"
                          ? "push notification text"
                          : " message"}{" "}
                        to be sent as{" "}
                        {communication_type.value === "notification"
                          ? "push notification"
                          : " SMS"}{" "}
                        to all customers.
                      </div>
                    )}
                    {!controls.sms_draft.showErrorMsg &&
                      this.state.smsConfig.isNotValidMinCount && (
                        <div className="error text-none">
                          *Maximum {this.state.maxCount} characters are allowed.
                        </div>
                      )}
                    <div
                      className="d-flex-row"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <span className="noofwordss">
                        {this.state.smsConfig.length}/{this.state.maxCount}
                      </span>
                    </div>

                    <div
                      className="d-flex-row mt-2"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="tag-wrapper">
                        {this.TagsWithoutOffer.map((item) => (
                          <span
                            className="Rectangletag"
                            onClick={() => this.addTags(item)}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    {!this.state.isHoLogin && (
                      <Row>
                        <Col xl="4">
                          <label
                            className="container-cb pr-0 pl-0 d-flex"
                            style={{ marginTop: "15px", float: "left" }}
                          >
                            <input
                              type="checkbox"
                              name="cc_self"
                              checked={this.state.cc_self === true || this.state.cc_self === 'true'}
                              id="checkbox"
                              onChange={this.handleChangecc_self}
                            />
                            <span className="ml-4" style={{ width: "105px" }}>
                              Mark copy to me
                            </span>
                            <span className="checkmarkrectangle" />
                          </label>
                        </Col>
                        {this.state.view_sender_id && this.state.senderIds &&
                          this.state.senderIds.length > 0 && (
                            <Col xl="8">
                              <FormGroup className="d-flex mb-0 mt-2">
                                <Label className="m-auto">
                                  Select Sender ID
                                </Label>
                                <select
                                  className="form-control 
                            select-height-70rem camp-select-sender-id"
                                  name="sender_id"
                                  value={controls.sender_id.value}
                                  onChange={(e) => this.handleChangeInput(e)}
                                >
                                  {this.state.senderIds.map((item) => (
                                    <option
                                      value={item.group_id}
                                      key={item.sender_id}
                                    >
                                      {item.sender_id}
                                    </option>
                                  ))}
                                </select>
                              </FormGroup>
                            </Col>
                          )}
                      </Row>
                    )}

                    <div
                      id="schedule_campaign"
                      className={
                        this.state.tooltipOpen &&
                          this.state.tooltip_name === "schedule_campaign"
                          ? "padding-top-15 box-shadow-40px-0-5"
                          : "padding-top-15"
                      }
                    >
                      Want to schedule this campaign ?
                      <div className="padding-top-10">
                        <label className="container-cc">
                          <input
                            type="checkbox"
                            name="is_scheduled"
                            id="checkbox"
                            onChange={this.handleChangeInput}
                            value={is_scheduled.value}
                            checked={is_scheduled.value}
                          />
                          Schedule this campaign
                          <span className="checkmarkrectangle" />
                        </label>
                      </div>
                      <UncontrolledPopover
                        placement={"right-start"}
                        hideArrow={false}
                        isOpen={
                          this.state.tooltipOpen &&
                          this.state.tooltip_name === "schedule_campaign"
                        }
                        fade={true}
                        target={"schedule_campaign"}
                        trigger="focus"
                        className="create-campaign-tooltip"
                      >
                        <div ref={(r) => (this.dealerPopOver = r)}>
                          <PopoverHeader className="popover-title d-flex justify-content-between">
                            <span>Help Guide Tour</span>
                            <span>7/9</span>
                          </PopoverHeader>
                          <PopoverBody className="d-flex-column">
                            <span className="popover-lbl mt-2">
                              Schedule SMS Campaign{" "}
                            </span>
                            <span className="popover-lbl-value mt-2">
                              When you are creating the campaign in your free
                              time and want to run the campaign later, you need
                              to select "Schedule this campaign"
                              <br />
                              Select Date and Time of campaign and it will run
                              automatically.
                              <br />
                              Example: coming Sunday is a Diwali and you want to
                              schedule festive wishes SMS prior to a week, you
                              can use this feature
                            </span>
                            <br />
                            {
                              <div className="d-flex-row justify-content-between mb-2">
                                <span
                                  className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                  onClick={() =>
                                    this.setState({
                                      tooltipOpen: true,
                                      tooltip_name: "message_box",
                                    })
                                  }
                                >
                                  Previous
                                </span>
                                <span
                                  className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                  onClick={() =>
                                    this.scrollBottom(
                                      "verify_preview",
                                      "verify_preview"
                                    )
                                  }
                                >
                                  Next
                                </span>
                              </div>
                            }
                          </PopoverBody>
                        </div>
                      </UncontrolledPopover>
                    </div>
                  </div>
                  {controls.is_scheduled.value === true ? (
                    <Row style={{ margin: 0 }}>
                      <Col sm="6">
                        <div className="d-flex-column">
                          <Label for="pan">Date</Label>
                          <Label
                            onClick={(e) =>
                              this.calendar3.state.open && e.preventDefault()
                            }
                          >
                            <InputGroup>
                              <DatePicker
                                className={"form-control"}
                                onChange={this.handleChangeDatePicker}
                                name="started_at"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                                showMonthDropdown
                                ref={(r) => (this.calendar3 = r)}
                                shouldCloseOnSelect={true}
                                showYearDropdown
                                minDate={new Date()}
                                dropdownMode="select"
                                selected={controls.started_at.value}
                              />
                              <div className="input-group-append">
                                <div className="input-group-text">
                                  <FontAwesomeIcon
                                    htmlFor="datepicker"
                                    style={{ opacity: "0.2" }}
                                    icon={faCalendarAlt}
                                  />
                                </div>
                              </div>
                            </InputGroup>
                          </Label>
                        </div>
                        {controls.started_at.showErrorMsg && (
                          <div className="error">
                            *Please add schedule date.
                          </div>
                        )}
                      </Col>
                      <Col className="d-flex-column" sm="6">
                        <Label for="pan">Time</Label>

                        <CustomTimePicker
                          time={this.state.time}
                          setTime={this.getTime}
                        />

                        {this.state.controls.is_scheduled.value &&
                          this.state.errorTime && (
                            <div className="error">*Please select Time.</div>
                          )}
                      </Col>
                      {!controls.started_at.showErrorMsg && (
                        <div style={{ color: "grey", marginLeft: "14px" }}>
                          *Please add schedule date & Time.
                        </div>
                      )}
                    </Row>
                  ) : (
                    <div></div>
                  )}
                </Col>
                {communication_type.value !== "notification" && (
                  <Col
                    lg="4"
                    sm="4"
                    md="4"
                    xs="12"
                    className="d-flex-column"
                    style={{ marginTop: "-155px" }}
                  >
                    <span className="Preview-Message">Preview Message</span>
                    <div
                      style={{ height: "350px" }}
                      id="verify_preview"
                      className={
                        this.state.tooltipOpen &&
                          this.state.tooltip_name === "verify_preview"
                          ? "sms-preview box-shadow-40px-0-5"
                          : "sms-preview"
                      }
                    >
                      <div className="sms-content-preview">
                        <div
                          className="chatbox-wrapper chatbox-dot"
                          style={{ margin: "10px" }}
                        >
                          <div className="chatbox-inner">
                            <div
                              className="scroll-container"
                              fxFlex="auto"
                              style={{ maxHeight: "230px" }}
                            >
                              {controls.sms_draft.value}
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <UncontrolledPopover
                        placement={"right-start"}
                        hideArrow={false}
                        isOpen={
                          this.state.tooltipOpen &&
                          this.state.tooltip_name === "verify_preview"
                        }
                        fade={true}
                        target={"verify_preview"}
                        trigger="focus"
                        className="create-campaign-tooltip"
                      >
                        <div ref={(r) => (this.dealerPopOver = r)}>
                          <PopoverHeader className="popover-title d-flex justify-content-between">
                            <span>Help Guide Tour</span>
                            <span>8/9</span>
                          </PopoverHeader>
                          <PopoverBody className="d-flex-column">
                            <span className="popover-lbl mt-2">
                              Verify Preview
                            </span>
                            <span className="popover-lbl-value mt-2">
                              Here you can see the actual preview of your SMS,
                              like how will it look in customer's mobile.
                              <br />
                              We recommend to review it once, before running the
                              campaign
                            </span>
                            <br />
                            {
                              <div className="d-flex-row justify-content-between mb-2">
                                <span
                                  className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                  onClick={() =>
                                    this.setState({
                                      tooltipOpen: true,
                                      tooltip_name: "schedule_campaign",
                                    })
                                  }
                                >
                                  Previous
                                </span>
                                <span
                                  className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                  onClick={() =>
                                    this.scrollBottom("run_now", "run_campaign")
                                  }
                                >
                                  Next
                                </span>
                              </div>
                            }
                          </PopoverBody>
                        </div>
                      </UncontrolledPopover>
                    </div>
                  </Col>
                )}
              </Row>
              <hr
                style={{
                  border: "solid 1px rgb(226, 227, 229)",
                  marginTop: "30px",
                }}
              />
              <Row style={{ marginLeft: "0", marginRight: "0" }}>
                <Col
                  xs="12"
                  md="12"
                  lg="12"
                  className="text-align-right"
                  style={{ marginTop: "5px" }}
                  id="run_now"
                >
                  {/* <Button
                    className="mb-1 mr-1 btn-pill action-button profile-cancel-button"
                    color="dark"
                    onClick={this.back}
                  >
                    Back
                  </Button> */}
                  {this.props.CampaignDetailData.isEdit ? (
                    <Button
                      className="mb-1 mr-1 btn-pill action-button font-weight-bold"
                      color="warning"
                      onClick={(e) => this.editCampaign(e)}
                      style={{ width: "116px" }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      color="warning"
                      onClick={(e) => this.createCampaign(e)}
                      style={{ width: "116px" }}
                      id="run_campaign"
                      className={
                        this.state.tooltipOpen &&
                          this.state.tooltip_name === "run_campaign"
                          ? "mb-1 mr-1 btn-pill action-button font-weight-bold box-shadow-40px-0-5"
                          : "mb-1 mr-1 btn-pill action-button font-weight-bold"
                      }
                    >
                      {is_scheduled.value ? "Schedule" : "Run Now"}
                    </Button>
                  )}
                  {!this.props.CampaignDetailData.isEdit && (
                    <UncontrolledPopover
                      placement={"right-start"}
                      hideArrow={false}
                      isOpen={
                        this.state.tooltipOpen &&
                        this.state.tooltip_name === "run_campaign"
                      }
                      fade={true}
                      target={"run_campaign"}
                      trigger="focus"
                      className="create-campaign-tooltip"
                    >
                      <div ref={(r) => (this.dealerPopOver = r)}>
                        <PopoverHeader className="popover-title d-flex justify-content-between">
                          <span>Help Guide Tour</span>
                          <span>9/9</span>
                        </PopoverHeader>
                        <PopoverBody className="d-flex-column">
                          <span className="popover-lbl mt-2">
                            Now you are ready to Run the Campaign
                          </span>
                          <span className="popover-lbl-value mt-2">
                            Click on "Run Now" to start the SMS campaign
                          </span>
                          <br />
                          {
                            <div className="d-flex-row justify-content-between mb-2">
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.setState({
                                    tooltipOpen: true,
                                    tooltip_name: "verify_preview",
                                  })
                                }
                              >
                                Previous
                              </span>
                              <span
                                className="link-blue cursor-pointer font-size-14px font-weight-bold"
                                onClick={() =>
                                  this.addHelpModuleScreen("create_campaign")
                                }
                              >
                                Close
                              </span>
                            </div>
                          }
                        </PopoverBody>
                      </div>
                    </UncontrolledPopover>
                  )}
                </Col>
              </Row>
              <br />
            </CardBody>
          </Card>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProp = (state) => ({
  helpGuide: state.User.helpGuide,
});

export default connect(mapStateToProp, null, null, { forwardRef: true })(
  CreateCampaign
);

