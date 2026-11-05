import React, { Component, createRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import classes from './Chatbot.module.css';
import { PROFILE, CHAT_API_URL } from '../../data/cv-knowledge.js';
import { offlineAnswer } from '../../data/chat-fallback.js';
import avatarImg from '../images/profilee.png';

const WELCOME = `Hi! I'm Aryan's AI assistant. Ask me about his experience, skills, projects, education, or how to reach him for a role.`;

export default class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      messages: [{ role: 'assistant', content: WELCOME }],
      input: '',
      busy: false
    };
    this.listRef = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open && !prevState.open) {
      this.scroll();
    }
    if (this.state.messages.length !== prevState.messages.length) {
      this.scroll();
    }
  }

  scroll() {
    requestAnimationFrame(() => {
      if (this.listRef.current) {
        this.listRef.current.scrollTop = this.listRef.current.scrollHeight;
      }
    });
  }

  toggle = () => {
    this.setState((s) => ({ open: !s.open }));
  };

  onInput = (e) => {
    this.setState({ input: e.target.value });
  };

  onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  };

  send = async () => {
    const { input, busy, messages } = this.state;
    const text = input.trim();
    if (!text || busy) return;

    const historyForApi = [...messages, { role: 'user', content: text }]
      .filter((m) => m.role !== 'error')
      .map((m) => ({ role: m.role, content: m.content }));

    this.setState({
      messages: [...messages, { role: 'user', content: text }],
      input: '',
      busy: true
    });

    const reply = await this.getReply(historyForApi);

    this.setState((s) => ({
      messages: [...s.messages, { role: 'assistant', content: reply }],
      busy: false
    }));
  };

  async getReply(historyForApi) {
    if (CHAT_API_URL) {
      try {
        const res = await fetch(CHAT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historyForApi })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) return data.reply;
        }
      } catch {
        // fall through to offline engine
      }
    }
    const lastUser = [...historyForApi].reverse().find((m) => m.role === 'user');
    return offlineAnswer(lastUser ? lastUser.content : '');
  }

  render() {
    const { open, messages, input, busy } = this.state;
    return (
      <div className={classes.wrapper}>
        <AnimatePresence>
          {open && (
            <motion.div
              className={classes.panel}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.92 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className={classes.header}>
                <div className={classes.headerInfo}>
                  <img src={avatarImg} alt='' className={classes.avatar} />
                  <div>
                    <div className={classes.headerTitle}>Aryan's AI Assistant</div>
                    <div className={classes.headerSubtitle}>
                      <span className={classes.dot} /> Ask about experience, skills & projects
                    </div>
                  </div>
                </div>
                <button className={classes.closeBtn} onClick={this.toggle} aria-label='Close chat'>
                  <FaTimes />
                </button>
              </div>

              <div className={classes.messages} ref={this.listRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`${classes.row} ${m.role === 'user' ? classes.userRow : classes.botRow}`}>
                    <div className={`${classes.bubble} ${m.role === 'user' ? classes.userBubble : classes.botBubble}`}>
                      {m.content.split('\n').map((line, j) => (
                        <p key={j} className={classes.line}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                {busy && (
                  <div className={`${classes.row} ${classes.botRow}`}>
                    <div className={`${classes.bubble} ${classes.botBubble}`}>
                      <span className={classes.typing}>
                        <i /> <i /> <i />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className={classes.inputBar}>
                <input
                  className={classes.input}
                  value={input}
                  onChange={this.onInput}
                  onKeyDown={this.onKey}
                  placeholder='Ask about Aryan...'
                  aria-label='Chat message'
                />
                <button className={classes.sendBtn} onClick={this.send} disabled={busy || !input.trim()} aria-label='Send message'>
                  <FaPaperPlane />
                </button>
              </div>
              <div className={classes.footer}>
                <FaRobot /> AI-generated answers based on the CV — may occasionally be imprecise.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={classes.fab}
          onClick={this.toggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? 'Close chat' : 'Open chat'}
        >
          {open ? <FaTimes /> : <FaCommentDots />}
        </motion.button>
      </div>
    );
  }
}
