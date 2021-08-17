import React from "react";
import * as XMPP from "stanza";
import Peer from "simple-peer";
import ReactHowler from "react-howler";
import { Button, Grid, Typography } from "@material-ui/core";
import callingPartnerTone from "./assets/calling_tone.mp3";
import {
  Call as CallIcon,
  Close as CloseIcon,
  Videocam as VideocamIcon,
} from "@material-ui/icons";

const client = XMPP.createClient({
  jid: "alice@localhost",
  password: "qwerty",
  // If you have a .well-known/host-meta.json file for your
  // domain, the connection transport config can be skipped.
  transports: {
    websocket: "ws://mongooseim:5280/ws-xmpp",
    bosh: "http://mongooseim:5280/http-bind",
  },
});

client.on("session:started", (params) => {
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
  console.log("alice got chaaat msg", msg);
  client.sendMessage({
    to: msg.from,
    body: "You sent: " + msg.body,
  });
});

client.on("message", (params) => {
  console.log("alice got msg", params);
});

const Alice = () => {
  const peerRef = React.useRef<Peer.Instance | null>(null);
  const myVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const myVideoStreamRef = React.useRef<MediaStream | null>(null);
  const partnerVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [showMyVideo, setShowMyVideo] = React.useState(false);
  const [showPartnerVideo, setShowPartnerVideo] = React.useState(false);
  const [callAnswered, setCallAnswered] = React.useState(false);
  const [callingPartner, setCallingPartner] = React.useState(false);

  React.useEffect(() => {
    client.connect();

    client.on("message", (msg) => {
      if (msg.hasSubject && msg.subject === "answer") {
        console.log("got answer from bob", msg);
        setCallAnswered(true);
        setCallingPartner(false);
        peerRef.current?.signal(msg.json);
      }

      if (msg.hasSubject && msg.subject === "dismissCall") {
        setCallingPartner(false);
        setCallAnswered(false);
        peerRef.current?.destroy();
      }

      if (msg.hasSubject && msg.subject === "videosignal") {
        console.log("alice is getting video signal from bob", msg.json);
        // setOfferSignal(msg.json);
        // setReceivingVideoRequest(true);
        peerRef.current?.signal(msg.json);
      }
    });

    return () => {
      client.disconnect();
      client.removeAllListeners();
    };
  }, []);

  const handleSignal = (data: Peer.SignalData) => {
    console.log("sending signal", data);
    if (data.type === "offer") {
      console.log("alice is sending offer", data);

      client.sendMessage({
        json: data,
        subject: data.type,
        to: "bob@localhost",
      });
    }
  };

  const callPartner = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(function (stream) {
        setCallingPartner(true);
        myVideoStreamRef.current = stream;

        const peer = new Peer({
          stream,
          trickle: false,
          initiator: true,
          offerOptions: {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          },
          config: {
            iceServers: [
              // Test some STUN server
              {
                urls: "stun:139.59.81.152:3478?transport=udp",
              },
              // Test some TURN server
              {
                urls: "turn:139.59.81.152:3478?transport=udp",
                username: "test",
                credential: "test123",
              },
            ],
          },
        });

        peer.on("close", () => {
          console.log("peer alice close handler");
          myVideoStreamRef.current
            ?.getTracks()
            .forEach((track) => track.stop());
          peer.destroy();
        });

        peer.on("stream", (stream) => {
          setShowPartnerVideo(true);

          console.log("alice is getting stream data from receiver", stream);

          if (
            partnerVideoRef.current &&
            "srcObject" in partnerVideoRef.current
          ) {
            partnerVideoRef.current!.srcObject = stream;
            partnerVideoRef.current!.play();
            console.log(partnerVideoRef.current, stream);
          } else {
            partnerVideoRef.current!.src = window.URL.createObjectURL(stream);
            partnerVideoRef.current!.play();
          }
        });

        peer.on("connect", () => {
          console.log("peer alice connected");
        });

        peer.on("error", () => {
          console.log("peer alice connection error");
        });

        peer.on("signal", handleSignal);

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

  const shareVideo = () => {
    peerRef.current?.removeAllListeners("signal");
    // peerRef.current?.removeListener("signal", handleSignal);

    peerRef.current?.on("signal", (videoSignal) => {
      console.log("sending video signal", videoSignal);

      if (videoSignal.type === "offer") {
        console.log("alice is sending offer", videoSignal);

        client.sendMessage({
          json: videoSignal,
          to: "bob@localhost",
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
        console.log("stream for bob again", stream);
        myVideoStreamRef.current = stream;
        setShowMyVideo(true);
        peerRef.current?.addStream(myVideoStreamRef.current!);
        if (myVideoRef.current && "srcObject" in myVideoRef.current) {
          myVideoRef.current!.srcObject = myVideoStreamRef.current;
        } else {
          myVideoRef.current!.src = window.URL.createObjectURL(
            myVideoStreamRef.current
          );
        }
      });
  };

  const dismissCall = () => {
    setCallAnswered(false);
    setCallingPartner(false);
    client.sendMessage({
      to: "bob@localhost",
      subject: "dismissCall",
    });
    peerRef.current?.destroy();
  };

  return (
    <div>
      <ReactHowler src={callingPartnerTone} playing={callingPartner} loop />

      <Typography variant={"h5"}>This is caller (alice) page</Typography>

      <br />

      {!callAnswered && (
        <Button
          onClick={callPartner}
          startIcon={<CallIcon />}
          disabled={callingPartner}
        >
          Call bob
        </Button>
      )}

      {!myVideoStreamRef.current && (
        <Button onClick={shareVideo} startIcon={<VideocamIcon />}>
          Share video
        </Button>
      )}

      {(callAnswered || callingPartner) && (
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

export default Alice;
