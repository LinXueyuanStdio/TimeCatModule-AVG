package com.timecat.module.vge.pokedroid.input.midi;

import com.badlogic.gdx.Files.FileType;

import java.io.IOException;
import java.io.InputStream;

public interface MidiPlayer {
    public void open(String fileName, FileType type);
    public void open(InputStream is) throws IOException;
    public boolean isLooping();
    public void setLooping(boolean loop);
    public void play();
    public void pause();
    public void stop();
    public void release();
    public boolean isPlaying();
    public void setVolume(float volume);
}
