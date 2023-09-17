import React, { useState, useEffect } from "react";
import { TextAreaHighlight } from "./textareahighlight";
import lodash from "lodash"; // library added for debounce functionality

const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [highLightTag, setHighLightTag] = useState([]);
  const [maxCount, setMaxCount] = useState(459);
  const [smsConfig, setSmsConfig] = useState({
    isNotValidMinCount: false,
    length: 0,
    smsContentCredit: 0,
  });
  const [tooltipText, setTooltipText] = useState("");
  const [controls, setControls] = useState({
    sms_draft: {
      value: "",
      valid: null,
      touched: false,
      nullValue: null,
    },
  });
  const isCharOfAnyTags = (text, position, code) => {
    const tagfinal = lodash.find(selectedTags, (tag) => {
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
  const onSmsDraftKeyDown = (event) => {
    if (event.keyCode === 8 || event.code === "Delete") {
      const tag = isCharOfAnyTags(
        event.target.value,
        event.target.selectionEnd - 1,
        event.keyCode
      );

      if (tag.tagfinal) {
        event.preventDefault();
        // let { selectedTags, highLightTag, controls } = this.state;
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
        let smsConfig = changeSMSContent(tmpVal, maxCount, true, false);
        setHighLightTag(highLightTag);
        setSelectedTags(selectedTags);
        setControls(controls);
        setSmsConfig(smsConfig);

        // this.setState({
        //   controls,
        //   highLightTag,
        //   selectedTags,
        //   smsConfig: smsConfig,
        // });
        replaceWords(controls.sms_draft.value);
      }
    }
  };
  const replaceWords = (text) => {
    // let userDetail = Storage.getUserDetail();
    if (text) {
      text = text.replace(/#CustomerName/g, "customer");
      text = text.replace(/#StoreName/g, "store name");
      text = text.replace(/#MakeName/g, "store name");
      text = text.replace(/#PhoneNumber/g, "store name");
      text = text.replace(/#ModelName/g, "store name");
    }
    setTooltipText(text);
    // this.setState({
    //   tooltipText: text,
    // });
  };
  const TagsWithoutOffer = ["#StoreName", "#PhoneNumber", "#CustomerName"];
  const onChangeSMSContent = (e) => {
    // let { controls, highLightTag, selectedTags } = this.state;
    controls["sms_draft"].showErrorMsg = false;
    if (!e) {
      e = { target: { value: controls["sms_draft"].value } };
    }
    let smsConfig = changeSMSContent(
      e.target.value,
      maxCount,
      controls.language.value === "english" ? true : false,
      controls.message_type.value === "picture" ? true : false
    );
    controls.sms_draft.value = e.target.value;
    // controls.sms_draft.touched = true;
    setControls(controls);
    setSmsConfig(smsConfig);
    // this.setState({
    //   controls,
    //   smsConfig: smsConfig,
    // });
    replaceWords(controls.sms_draft.value);

    //copy paste tags
    if (
      highLightTag.length !== TagsWithoutOffer.length &&
      (controls.sms_draft.value !== "" ||
        controls.sms_draft.value !== null ||
        controls.sms_draft.value !== undefined)
    ) {
      TagsWithoutOffer.forEach((element) => {
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
      setHighLightTag(highLightTag);
      setSelectedTags(selectedTags);
      //   this.setState({
      //     highLightTag,
      //     selectedTags,
      //   });
    }
    //   var urlRegex = /(https?:\/\/[^\s]+)/g;
    //   let url = text.replace(urlRegex, function(url) {
    //     return  url ;
    // })

    handleValidation();
  };
  const handleValidation = (isSubmit = false) => {
    // let { controls, isFormValid } = this.state;
    // let {
    //   purpose_id,
    //   // campaign_name,
    //   sms_draft,
    //   image_url,
    //   message_type,
    //   started_at,
    //   is_scheduled,
    // } = controls;
    // let scroll_id = "";
    // if (
    //   image_url.touched === true ||
    //   (isSubmit && message_type.value !== "simple")
    // ) {
    //   image_url = Validation.notNullValidator(image_url);
    //   image_url.valid = !image_url.nullValue;
    //   if (image_url.valid === false) {
    //     image_url.showErrorMsg = true;
    //     scroll_id = "image_url";
    //   } else {
    //     image_url.showErrorMsg = false;
    //   }
    // }

    // if (
    //   (started_at.touched === true || isSubmit) &&
    //   is_scheduled.value === true
    // ) {
    //   started_at = Validation.notNullValidator(started_at);
    //   started_at.valid = !started_at.nullValue;
    //   if (started_at.valid === false) {
    //     started_at.showErrorMsg = true;
    //   } else {
    //     started_at.showErrorMsg = false;
    //   }
    // } else {
    //   started_at.valid = true;
    // }

    // if ((purpose_id.touched === true || isSubmit) && !this.state.isHoLogin) {
    //   purpose_id = Validation.notNullValidator(purpose_id);
    //   purpose_id.valid = !purpose_id.nullValue;
    //   if (purpose_id.valid === false) {
    //     purpose_id.showErrorMsg = true;
    //     if (!scroll_id) {
    //       scroll_id = "purpose_id";
    //     }
    //   } else {
    //     purpose_id.showErrorMsg = false;
    //   }
    // } else {
    //   purpose_id.valid = true;
    // }

    // // if (campaign_name.touched === true || isSubmit) {
    // //   campaign_name = Validation.notNullValidator(campaign_name);
    // //   campaign_name.valid = !campaign_name.nullValue;
    // //   if (campaign_name.valid === false) {
    // //     campaign_name.showErrorMsg = true;
    // //     if (!scroll_id) {
    // //       scroll_id = "campaign_name";
    // //     }
    // //   } else {
    // //     campaign_name.showErrorMsg = false;
    // //   }
    // // }

    // if (sms_draft.touched === true || isSubmit) {
    //   sms_draft = Validation.notNullValidator(sms_draft);
    //   sms_draft.valid = !sms_draft.nullValue;
    //   if (sms_draft.valid === false) {
    //     sms_draft.showErrorMsg = true;
    //     if (!scroll_id) {
    //       scroll_id = "sms_draft";
    //     }
    //   } else {
    //     sms_draft.showErrorMsg = false;
    //   }
    // }

    // if (
    //   purpose_id.valid === true &&
    //   sms_draft.valid === true &&
    //   started_at.valid === true
    // ) {
    //   isFormValid = true;
    // } else {
    //   isFormValid = false;
    // }

    // this.setState({
    //   controls,
    //   isFormValid,
    // });
    // if (scroll_id) {
    //   this.scrollTo(scroll_id);
    // }
    return true;
  };
  function changeSMSContent(text = "", maxCount, isEnglish, isPictureSMS) {
    if (text === null || text === undefined) {
      text = "";
    }
    // if (isPictureSMS) {
    //   if (processEnv.NODE_ENV === "production") {
    //     text +=
    //       "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"; // if picture sms then add 32 space
    //   } else {
    //     text +=
    //       "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"; // if picture sms then add 32 space
    //   }
    // } else {
    //   if (processEnv.NODE_ENV === "production") {
    //     text += text.slice(-1, -19);
    //   } else {
    //     text += text.slice(-1, -33);
    //   }
    // }
    // text += text.slice(-1, -33);
    let length = text.length;
    let validMinCount = maxCount - length;
    const totalOccurence = (text.match(new RegExp("\n", "g")) || []).length;
    if (totalOccurence > 0) {
      length = length + totalOccurence;
      validMinCount = maxCount - length;
    }
    if (text.includes("#GMBStoreLink") === true) {
      length = length - "#GMBStoreLink".length;
      let url = window.location.href.split("#/");
      length = length + url[0].length + "#/b/dealer".length;
    }
    let smsContentCredit = 0;
    if (isEnglish) {
      if (length === 0) {
        smsContentCredit = 0;
      } else if (length > 0 && length < 161) {
        smsContentCredit = 1;
      } else if (length > 160 && length < 307) {
        smsContentCredit = 2;
      } else if (length > 306 && length < 460) {
        smsContentCredit = 3;
      } else if (length >= 460) {
        smsContentCredit = 4;
      }
    } else {
      if (length > 469) {
        smsContentCredit = 8;
      } else if (length > 402) {
        smsContentCredit = 7;
      } else if (length > 335) {
        smsContentCredit = 6;
      } else if (length > 268) {
        smsContentCredit = 5;
      } else if (length > 201) {
        smsContentCredit = 4;
      } else if (length > 134) {
        smsContentCredit = 3;
      } else if (length > 70) {
        smsContentCredit = 2;
      } else if (length === 0) {
        smsContentCredit = 0;
      } else {
        smsContentCredit = 1;
      }
    }
    return {
      length: length,
      isNotValidMinCount: validMinCount >= 0 ? false : true,
      smsContentCredit: smsContentCredit,
    };
  }
  return (
    <TextAreaHighlight
      id="message_box"
      //   className={
      //     this.state.tooltipOpen && this.state.tooltip_name === "message_box"
      //       ? "inputbox-textarea box-shadow-40px-0-5"
      //       : "inputbox-textarea"
      //   }
      value={controls.sms_draft.value}
      onKeyDown={onSmsDraftKeyDown}
      onChange={onChangeSMSContent}
      //   ref={(r) => (this.refTextAreaHighlight = r)}
      highlight={() => highLightTag}
    />
  );
};

export default App;
