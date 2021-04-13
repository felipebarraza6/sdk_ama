import React, { useEffect } from 'react'
import { ZoomMtg } from '@zoomus/websdk'

const joinMeeting = (signature, meetConfig, state) => {
  console.log(meetConfig)

  document.getElementById('zmmtg-root').style.display = 'block'
  ZoomMtg.showInviteFunction({
    show: false
})
    ZoomMtg.init({
        meetingInfo: [
      'topic',
      'host',
    ],
      leaveUrl: 'https://amamaule.cl/profile',

    showMeetingHeader: false, //option
    disableInvite: false, //optional
    disableCallOut: true, //optional
    disableRecord: true, //optional
    disableJoinAudio: true, //optional
    audioPanelAlwaysOpen: false, //optional
    showPureSharingContent: false, //optional
    isSupportAV: true, //optional,
    isSupportChat: true, //optional,
    isSupportQA: false, //optional,
    isSupportPolling: false, //optional
    isSupportBreakout: false, //optional
    isSupportCC: false, //optional,
    screenShare: false, //optional,
    rwcBackup: '', //optional,
    videoDrag: false, //optional,
    sharingMode: 'both', //optional,
    videoHeader: false, //optional,
    isLockBottom: false, // optional,
    isSupportNonverbal: false, // optional,
    isShowJoiningErrorDialog: false, // optional,
      success: function (success) {
        console.log("Init Success ", success)
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: meetConfig.apiKey,
          passWord: meetConfig.passWord,

          success: (success) => {
            console.log(success);
          },

          error: (error) => {
            console.log(error);
          },
        })
      },
    })
  }

const SDKwebinar = ({transmission, user}) => {

  var first_name = user.first_name
  var last_name = user.last_name
  console.log(`${first_name} ${last_name}`)
  const meetConfig = {
      apiKey: transmission.zoom_api_key,
      apiSecret: transmission.zoom_api_secret,
      meetingNumber: transmission.zoom_meeting_number,
      userName: `${first_name} ${last_name}`,
      userEmail: '', // (optional) must be the attendee email address
      passWord: transmission.zoom_passcode, // !!warning, this is the passcode for meeting room, not for user password
      role: 0, // 0 for guest, 1 for host
  }

    useEffect(() => {
          // setZoomJSLib version 1.8.1 caused breaking, must be same as installed package verision
          // installing this of version 1.7.x caused breaking
          ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av')
          ZoomMtg.preLoadWasm()
          ZoomMtg.prepareJssdk()
          ZoomMtg.i18n.load('es-ES')
          /**
           * You should not visible api secret key on frontend
           * Signature must be generated on server
           * https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
           */
          ZoomMtg.generateSignature({
            meetingNumber: meetConfig.meetingNumber,
            apiKey: meetConfig.apiKey,
            apiSecret: meetConfig.apiSecret,

            role:0,
            success: function (res) {
              console.log("res", res);

              setTimeout(() => {
                joinMeeting(res.result, meetConfig)
              }, 1000);
            },
          });
          ZoomMtg.showInviteFunction({
            show: true
        })


      }, [meetConfig])

    return(<></>)

}


export default SDKwebinar