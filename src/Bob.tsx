import React from "react";
import Peer from "simple-peer";
import * as XMPP from "stanza";
import ReactHowler from "react-howler";
import callReceivingRingtone from "./assets/ringtone.mp3";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import {
  Call as CallIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Videocam as VideocamIcon,
} from "@material-ui/icons";

const client = XMPP.createClient({
  jid: "bob@localhost",
  password: "12345678",
  // If you have a .well-known/host-meta.json file for your
  // domain, the connection transport config can be skipped.
  transports: {
    websocket: "ws://mongooseim:5280/ws-xmpp",
    bosh: "http://mongooseim:5280/http-bind",
  },
});

client.on("session:started", (params) => {
  client.getRoster().then((r) => console.log("roster", r));
  client.sendPresence();
});

client.on("attention", (params) => {
  console.log("attention", params);
});

client.on("auth:failed", () => {
  console.log("auth:failed");
});

client.on("auth:success", (params) => {
  console.log("auth:success", params);
});

client.on("available", (params) => {
  console.log("available", params);
});

client.on("avatar", (params) => {
  console.log("avatar", params);
});

client.on("block", (params) => {
  console.log("block", params);
});

client.on("bosh:terminate", (params) => {
  console.log("bosh:terminate", params);
});

client.on("carbon:received", (params) => {
  console.log("carbon:received", params);
});

client.on("carbon:sent", (params) => {
  console.log("carbon:sent", params);
});

client.on("chat:state", (params) => {
  console.log("chat:state", params);
});

client.on("connected", () => {
  console.log("connected");
});

client.on("activity", (params) => {
  console.log("activity", params);
});

client.on("credentials:update", (params) => {
  console.log("credentials:update", params);
});

client.on("dataform", (params) => {
  console.log("dataform", params);
});

client.on("disco:caps", (params) => {
  console.log("disco:caps", params);
});

client.on("features", (params) => {
  console.log("features", params);
});

client.on("geoloc", (params) => {
  console.log("geoloc", params);
});

client.on("iq", (params) => {
  console.log("iq", params);
});

client.on("iq:get:ping", (params) => {
  console.log("iq:get:ping", params);
});

client.on("iq:get:disco", (params) => {
  console.log("iq:get:disco", params);
});

client.on("iq:get:softwareVersion", (params) => {
  console.log("iq:get:softwareVersion", params);
});

client.on("iq:set:roster", (params) => {
  console.log("iq:set:roster", params);
});

client.on("mam:item", (params) => {
  console.log("mam:item", params);
});

client.on("groupchat", (params) => {
  console.log("groupchat", params);
});

client.on("disconnected", (params) => {
  console.log("disconnected", params);
});

client.on("pubsub:subscription", (params) => {
  console.log("pubsub:subscription", params);
});

client.on("roster:ver", (params) => {
  console.log("roster:ver", params);
});

client.on("message", (params) => {
  console.log("bob got msg", params);
});

client.on("roster:update", (params) => {
  console.log("roster:update", params);
});

client.on("muc:available", (params) => {
  console.log("muc:available", params);
});

client.on("muc:declined", (params) => {
  console.log("muc:declined", params);
});

client.on("muc:destroyed", (params) => {
  console.log("muc:destroyed", params);
});

client.on("muc:failed", (params) => {
  console.log("muc:failed", params);
});

client.on("muc:error", (params) => {
  console.log("muc:error", params);
});

client.on("muc:failed", (params) => {
  console.log("muc:failed", params);
});

client.on("muc:invite", (params) => {
  console.log("muc:invite", params);
});

client.on("muc:join", (params) => {
  console.log("muc:join", params);
});

client.on("muc:leave", (params) => {
  console.log("muc:leave", params);
});

client.on("muc:other", (params) => {
  console.log("muc:other", params);
});

client.on("muc:topic", (params) => {
  console.log("muc:topic", params);
});

client.on("muc:unavailable", (params) => {
  console.log("muc:unavailable", params);
});

client.on("nick", (params) => {
  console.log("nick", params);
});

client.on("unsubscribed", (params) => {
  console.log("unsubscribed", params);
});

client.on("unsubscribe", (params) => {
  console.log("unsubscribe", params);
});

client.on("unblock", (params) => {
  console.log("unblock", params);
});

client.on("unavailable", (params) => {
  console.log("unavailable", params);
});

client.on("subscribed", (params) => {
  console.log("subscribed", params);
});

client.on("subscribe", (params) => {
  console.log("subscribe", params);
});

client.on("presence", (params) => {
  console.log("presence", params);
});

client.on("presence:error", (params) => {
  console.log("presence:error", params);
});

client.on("probe", (params) => {
  console.log("probe", params);
});

client.on("chat", (msg) => {
  console.log("bob got chaaat msg", msg);
  // client.sendMessage({
  //   to: msg.from,
  //   body: "You sent: " + msg.body,
  // });
});

const Bob = () => {
  const myVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const myVideoStreamRef = React.useRef<MediaStream | null>(null);
  const partnerVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [showMyVideo, setShowMyVideo] = React.useState(false);
  const [showPartnerVideo, setShowPartnerVideo] = React.useState(false);
  const [callerJid, setCallerJid] = React.useState("");
  const peerRef = React.useRef<Peer.Instance | null>(null);
  const [callAnswered, setCallAnswered] = React.useState(false);
  const [receivingCall, setReceivingCall] = React.useState(false);
  const [receivingVideoRequest, setReceivingVideoRequest] =
    React.useState(false);
  const [offerSignal, setOfferSignal] = React.useState<Peer.SignalData | null>(
    null
  );

  React.useEffect(() => {
    client.connect();

    return () => {
      client.disconnect();
      client.removeAllListeners();
    };
  }, []);

  React.useEffect(() => {
    client.on("message", (msg) => {
      if (msg.hasSubject && msg.subject === "offer") {
        console.log("bob got offer from alice", msg);
        setCallerJid(msg.from);
        setReceivingCall(true);
        setOfferSignal(msg.json);
      }

      if (msg.hasSubject && msg.subject === "dismissCall") {
        setOfferSignal(null);
        setReceivingCall(false);
        setCallerJid("");
        setCallAnswered(false);
        peerRef.current?.destroy();
      }

      if (msg.hasSubject && msg.subject === "videosignal") {
        setOfferSignal(msg.json);
        setReceivingVideoRequest(true);
      }
    });
  }, []);

  const handleSignal = (data: Peer.SignalData) => {
    if (data.type === "answer") {
      setCallAnswered(true);

      console.log("bob is ready to answer call", data);
      client.sendMessage({
        json: data,
        to: callerJid,
        subject: data.type,
      });
    }
  };

  const answerCall = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(function (stream) {
        setReceivingCall(false);
        myVideoStreamRef.current = stream;

        const peer = new Peer({
          stream,
          trickle: false,
          offerOptions: {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          },
          config: {
            iceServers: [
              // Test some STUN server
              {
                urls: "stun:172.17.0.2:3478",
              },
              // Test some TURN server
              {
                urls: "turn:172.17.0.2:3478",
                credentialType: "password",
                credential: "very_secret",
                username: "caller akib",
              },
            ],
          },
        });

        peer.on("stream", (stream) => {
          setShowPartnerVideo(true);
          console.log("bob is getting stream data", stream, showPartnerVideo);

          if (
            partnerVideoRef.current &&
            "srcObject" in partnerVideoRef.current
          ) {
            partnerVideoRef.current!.srcObject = stream;
            console.log(partnerVideoRef.current, stream);
          } else {
            partnerVideoRef.current!.src = window.URL.createObjectURL(stream);
            console.log(partnerVideoRef.current, stream);
          }
        });

        peer.on("connect", () => {
          console.log("peer bob connected");
        });

        peer.on("signal", handleSignal);

        peer.on("close", () => {
          console.log("peer bob close handler");
          myVideoStreamRef.current
            ?.getTracks()
            .forEach((track) => track.stop());
          peer.destroy();
        });

        if (offerSignal) {
          peer.signal(offerSignal);
        }

        setShowMyVideo(true);
        if (myVideoRef.current && "srcObject" in myVideoRef.current) {
          myVideoRef.current!.srcObject = myVideoStreamRef.current;
        } else {
          myVideoRef.current!.src = window.URL.createObjectURL(
            myVideoStreamRef.current
          );
        }

        peerRef.current = peer;
      });
  };

  const acceptVideoRequest = () => {
    if (offerSignal) {
      peerRef.current?.signal(offerSignal);
      setReceivingVideoRequest(false);
    }
  };

  const dismissCall = () => {
    setCallerJid("");
    setCallAnswered(false);
    setReceivingCall(false);

    client.sendMessage({
      to: callerJid,
      subject: "dismissCall",
    });
    peerRef.current?.destroy();
  };

  const shareVideo = () => {
    peerRef.current?.removeListener("signal", handleSignal);
    peerRef.current?.on("signal", (videoSignal) => {
      console.log("sending video signal", videoSignal);

      if (videoSignal.type === "renegotiate") {
        console.log("bob is sending video signal", videoSignal);

        client.sendMessage({
          to: callerJid,
          json: videoSignal,
          subject: "videosignal",
        });
      }
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(function (stream) {
        myVideoStreamRef.current = stream;
        setShowMyVideo(true);
        peerRef.current?.addStream(myVideoStreamRef.current);
        if (myVideoRef.current && "srcObject" in myVideoRef.current) {
          myVideoRef.current!.srcObject = myVideoStreamRef.current;
        } else {
          myVideoRef.current!.src = window.URL.createObjectURL(
            myVideoStreamRef.current
          );
        }
      });
  };

  return (
    <div>
      <ReactHowler src={callReceivingRingtone} playing={receivingCall} loop />
      <Typography variant={"h5"}>This is receiver (bob) page</Typography>
      <br />

      {receivingCall && !!callerJid && (
        <Typography>{callerJid} is calling you</Typography>
      )}

      {receivingVideoRequest && !!callerJid && (
        <Typography>{callerJid} is requesting video</Typography>
      )}

      {receivingCall && (
        <IconButton onClick={answerCall}>
          <CallIcon />
        </IconButton>
      )}

      {receivingVideoRequest && (
        <Button startIcon={<CheckIcon />} onClick={acceptVideoRequest}>
          Accept video
        </Button>
      )}

      {/* <Button startIcon={<VideocamIcon />} onClick={shareVideo}>
        Share video
      </Button> */}

      {(callAnswered || receivingCall) && (
        <Button onClick={dismissCall} startIcon={<CloseIcon />}>
          Dismiss call
        </Button>
      )}

      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Me</Typography>
          {showMyVideo && (
            <video
              muted
              height={500}
              width={"100%"}
              ref={myVideoRef}
              autoPlay
            ></video>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography>Partner</Typography>
          {showPartnerVideo && (
            <video
              height={500}
              width={"100%"}
              ref={partnerVideoRef}
              autoPlay
            ></video>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Bob;
